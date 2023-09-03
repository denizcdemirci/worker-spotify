import { Buffer } from 'node:buffer';
import { Track } from 'spotify-types';
import { ResponseTrack } from './types/base';

export const filterTrack = (track: Track): ResponseTrack => ({
  name: track.name,
  artist: track.artists?.map((artist) => artist?.name).join(', '),
  album: track.album?.name,
  url: track.external_urls.spotify,
  cover: track.album?.images?.[0]?.url
});

export const encodeToBase64 = (str: string): string => Buffer.from(str).toString('base64');
