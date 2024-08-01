import { ChangeEvent } from 'react';

export type Artist = {
  name: string;
};

export type AlbumImage = {
  url: string;
};

export type Album = {
  images: AlbumImage[];
};

export type Song = {
  name: string;
  artists: Artist[];
  album: Album;
  preview_url: string;
};

export type SongListProps = {
  isLoading: boolean;
  songs: Song[];
  onSongSelected: (song: Song) => void;
};

export type PlayerProps = {
  song: Song;
  isPlay: boolean;
  onButtonClick: () => void;
};

export type SearchInputProps = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export type PaginationProps = {
  onPrev?: () => void;
  onNext?: () => void;
};
