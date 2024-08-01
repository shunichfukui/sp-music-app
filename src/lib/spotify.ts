import axios from 'axios';

class SpotifyClient {
  token: string | undefined;

  private constructor(token: string) {
    this.token = token;
  }

  static async initialize() {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID!,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET!,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return new SpotifyClient(response.data.access_token);
  }

  async fetchPopularSongs() {
    const response = await axios.get(
      // FIXME: 37i9dQZF1DX9vYRBO9gjDeはspotifyの人気ランキングを取得
      'https://api.spotify.com/v1/playlists/37i9dQZF1DX9vYRBO9gjDe/tracks',
      {
        headers: { Authorization: 'Bearer ' + this.token },
      }
    );
    return response.data;
  }
}

export default SpotifyClient;
