export interface ITrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  slug: string;
  coverImage: string;
  audioFile: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITracksMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
