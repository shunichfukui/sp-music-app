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
};

export type SongListProps = {
  isLoading: boolean;
  songs: Song[];
};
