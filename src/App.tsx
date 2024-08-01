import { ChangeEvent, useEffect, useRef, useState } from 'react';
import SpotifyClient from './lib/spotify';
import { SongList } from './components/SongList';
import { Song } from './types';
import { Player } from './components/Player';
import { Pagination } from './components/Pagination';
import { DEFAULT_DISPLAY_MUSIC_LIMIT } from './constants';
import { SearchInput } from './components/SearchInpt';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState<Song[]>([]);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [spotifyClient, setSpotifyClient] = useState<SpotifyClient | null>(null);
  const [keyword, setKeyword] = useState<string>('');
  const [searchedSongs, setSearchedSongs] = useState<Song[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsSearched(searchedSongs.length > 0);
  }, [searchedSongs]);

  useEffect(() => {
    const initializeClient = async () => {
      const client = await SpotifyClient.initialize();
      setSpotifyClient(client);
    };
    initializeClient();
  }, []);

  useEffect(() => {
    if (spotifyClient) {
      fetchPopularSongs();
    }
  }, [spotifyClient]);

  useEffect(() => {
    if (spotifyClient && keyword) {
      fetchSongs(page);
    }
  }, [page]);

  const fetchPopularSongs = async () => {
    if (!spotifyClient) return;
    setIsLoading(true);
    const result = await spotifyClient.fetchPopularSongs();
    const popularSongs = result.items
      .map((item: any) => item.track)
      .filter((track: any) => track.preview_url);
    setPopularSongs(popularSongs);
    setIsLoading(false);
  };

  const handleSongSelected = async (song: Song) => {
    if (audioRef.current) {
      setSelectedSong(song);
      audioRef.current.src = song.preview_url;
      audioRef.current.play();
      setIsPlay(true);
    }
  };

  const toggleSong = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
        setIsPlay(false);
      } else {
        audioRef.current.play();
        setIsPlay(true);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const fetchSongs = async (page: number) => {
    if (!spotifyClient || !keyword) return;
    setIsLoading(true);
    const offset = (page - 1) * DEFAULT_DISPLAY_MUSIC_LIMIT;
    const result = await spotifyClient.searchSongs(keyword, DEFAULT_DISPLAY_MUSIC_LIMIT, offset);
    setHasNext(result.next != null);
    setHasPrev(result.previous != null);
    setSearchedSongs(result.items);
    setIsLoading(false);
  };

  const moveToNext = () => {
    if (hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const moveToPrev = () => {
    if (hasPrev) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearchSubmit = () => {
    fetchSongs(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput handleInputChange={handleInputChange} onSubmit={handleSearchSubmit} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">
            {isSearched ? `${keyword}の検索結果` : 'あなたにオススメの音楽'}
          </h2>
          <SongList
            isLoading={isLoading}
            songs={isSearched ? searchedSongs : popularSongs}
            onSongSelected={handleSongSelected}
          />
          {isSearched && (
            <Pagination
              onPrev={hasPrev ? moveToPrev : undefined}
              onNext={hasNext ? moveToNext : undefined}
            />
          )}
        </section>
      </main>
      {selectedSong && <Player song={selectedSong} isPlay={isPlay} onButtonClick={toggleSong} />}
      <audio ref={audioRef} />
    </div>
  );
}
