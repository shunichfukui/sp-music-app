import { useEffect, useRef, useState } from 'react';
import SpotifyClient from './lib/spotify';
import { SongList } from './components/SongList';
import { Song } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState<Song[]>([]);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchPopularSongs();
  }, []);

  const fetchPopularSongs = async () => {
    setIsLoading(true);
    const client = await SpotifyClient.initialize();
    const result = await client.fetchPopularSongs();
    const popularSongs = result.items
      .map((item: any) => item.track)
      .filter((track: any) => track.preview_url);

    setPopularSongs(popularSongs);
    setIsLoading(false);
  };

  const handleSongSelected = async (song: Song) => {
    if (audioRef.current) {
      setSelectedSong(song);
      console.log(song, 'songの値');

      audioRef.current.src = song.preview_url;
      audioRef.current.play();
      setIsPlay(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">あなたにオススメの音楽</h2>
          <SongList
            isLoading={isLoading}
            songs={popularSongs}
            onSongSelected={handleSongSelected}
          />
        </section>
      </main>
      <audio ref={audioRef} />
    </div>
  );
}
