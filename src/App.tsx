import { useEffect, useState } from 'react';
import SpotifyClient from './lib/spotify';
import { SongList } from './components/SongList';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState<any[]>([]);

  useEffect(() => {
    fetchPopularSongs();
  }, []);

  const fetchPopularSongs = async () => {
    setIsLoading(true);
    const client = await SpotifyClient.initialize();
    const result = await client.fetchPopularSongs();
    const popularSongs = result.items.map((item: any) => {
      return item.track;
    });
    setPopularSongs(popularSongs);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">あなたにオススメの音楽</h2>
          <SongList isLoading={isLoading} songs={popularSongs} />
        </section>
      </main>
    </div>
  );
}
