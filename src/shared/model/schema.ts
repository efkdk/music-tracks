export interface ITracksMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ITracksParams {
  page?: number;
  limit?: number;
  sort?: 'title' | 'artist' | 'album' | 'createdAt';
  order?: 'asc' | 'desc';
  genre?: string;
  artist?: string;
  search?: string;
}

export interface IErrorData {
  error: string;
}
