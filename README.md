## worker-spotify

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/denizcdemirci/worker-spotify)

This template is a simple [Spotify Web API](https://developer.spotify.com/documentation/web-api) wrapper for Cloudflare Workers. It returns the currently playing song on Spotify. You can use it to display the currently playing song on your website.

[`src/index.ts`](https://github.com/denizcdemirci/worker-spotify/blob/main/src/index.ts) is the content of the Workers script.

Here is an example of the response to the script:

```json
{
  "isPlaying": true,
  "name": "The Less I Know The Better",
  "artist": "Tame Impala",
  "album": "Currents",
  "url": "https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ",
  "cover": "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79"
}
```

## Setup

To create a `worker-spotify` directory using this template, run:

```sh
$ npx wrangler generate worker-spotify https://github.com/denizcdemirci/worker-spotify
# or
$ yarn wrangler generate worker-spotify https://github.com/denizcdemirci/worker-spotify
# or
$ pnpm wrangler generate worker-spotify https://github.com/denizcdemirci/worker-spotify
```

This template requires a Spotify app. Instructions for setting up a Spotify app can be found [in this documentation](https://developer.spotify.com/documentation/web-api/tutorials/getting-started).

Before publishing your script, you need to edit the `wrangler.toml` file. Add your Spotify app's `CLIENT_ID`, `CLIENT_SECRET` and `REFRESH_TOKEN` to this file. More information about configuring and publishing your script can be found [in the documentation](https://developers.cloudflare.com/workers/get-started/guide/).

Once you are ready, you can publish your script by running the following command:

```sh
$ npm run deploy
# or
$ yarn run deploy
# or
$ pnpm run deploy
```

## Notes

Your Spotify app must have the [`user-read-currently-playing`](https://developer.spotify.com/documentation/web-api/concepts/scopes#user-read-currently-playing) and [`user-read-recently-played`](https://developer.spotify.com/documentation/web-api/concepts/scopes#user-read-recently-played) scopes.

Note that Spotify imposes [rate limits](https://developer.spotify.com/documentation/web-api/concepts/rate-limits) on API calls. If there is an application that will receive a lot of requests, you need to add [cache](https://developers.cloudflare.com/workers/runtime-apis/cache) for this template.
