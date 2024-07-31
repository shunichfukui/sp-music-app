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

  test() {
    console.log(this.token);
  }
}

export default SpotifyClient;
