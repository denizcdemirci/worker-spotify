import { AccessToken, CurrentlyPlaying, RecentlyPlayed, Track } from 'spotify-types';
import { SpotifyClientOptions, ResponseTrack, CurrentlyPlayingResponse } from './types/base';
import { filterTrack, encodeToBase64 } from './utils';

const ENDPOINTS = {
  accessToken: 'https://accounts.spotify.com/api/token',
  currentlyPlaying: 'https://api.spotify.com/v1/me/player/currently-playing',
  recentlyPlayed: 'https://api.spotify.com/v1/me/player/recently-played'
};

export default {
  async fetch(request: Request, env: SpotifyClientOptions, ctx: ExecutionContext): Promise<Response> {
    let accessToken: string | null = null;

    const getAccessToken = async () => {
      try {
        const basicToken = encodeToBase64(`${env.CLIENT_ID}:${env.CLIENT_SECRET}`);

        const response = await fetch(ENDPOINTS.accessToken, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `grant_type=refresh_token&refresh_token=${env.REFRESH_TOKEN}`
        });

        const responseData = (await response.json()) as AccessToken;
        return responseData?.access_token;
      } catch (error: any) {
        throw new Error(error);
      }
    };

    const getRecentlyPlayed = async (): Promise<ResponseTrack> => {
      try {
        if (accessToken === null) accessToken = await getAccessToken();

        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch(ENDPOINTS.recentlyPlayed, { headers });

        if (response.status === 401) {
          accessToken = await getAccessToken();
          return getRecentlyPlayed();
        }

        const responseData = (await response.json()) as RecentlyPlayed;
        return filterTrack(responseData.items[0].track as Track);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    const getCurrentPlaying = async (): Promise<CurrentlyPlayingResponse | null> => {
      try {
        if (accessToken === null) accessToken = await getAccessToken();

        const headers = { Authorization: `Bearer ${accessToken}` };
        const response = await fetch(ENDPOINTS.currentlyPlaying, { headers });

        if (response.status === 401) {
          accessToken = await getAccessToken();
          return getCurrentPlaying();
        }

        if (response.status === 204) {
          return {
            isPlaying: false,
            ...(await getRecentlyPlayed())
          };
        }

        const responseData = (await response.json()) as CurrentlyPlaying;
        const currentTrack = filterTrack(responseData.item as Track);

        return {
          isPlaying: true,
          ...currentTrack
        };
      } catch (error: any) {
        throw new Error(error);
      }
    };

    const results = JSON.stringify(await getCurrentPlaying());

    return new Response(results, {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    });
  }
};
