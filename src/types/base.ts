export interface SpotifyClientOptions {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  REFRESH_TOKEN: string;
}

export interface ResponseTrack {
  name: string | null;
  artist: string | null;
  album: string | null;
  url: string | null;
  cover: string | null;
}

export interface CurrentlyPlayingResponse extends ResponseTrack {
  isPlaying: boolean;
}
