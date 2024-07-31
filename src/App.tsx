import React, { useEffect, useState } from 'react';
import SpotifyClient from './lib/spotify';

export default function App() {
  const [spotifyClient, setSpotifyClient] = useState<SpotifyClient | null>(null);

  useEffect(() => {
    const initializeSpotify = async () => {
      const client = await SpotifyClient.initialize();
      setSpotifyClient(client);
      client.test();
    };

    initializeSpotify();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">あなたにオススメの音楽</h2>
        </section>
      </main>
    </div>
  );
}
