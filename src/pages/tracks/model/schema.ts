export type SortField = 'title' | 'artist' | 'album' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface TracksSortProps {
  sortOptions?: {
    by?: SortField;
    order?: SortOrder;
  };
  onChange: (value?: { by: SortField; order: SortOrder }) => void;
}

export interface IFilterOptions {
  genre?: string;
  artists?: string;
}
export interface GenreFilterProps {
  filters?: IFilterOptions;
  onChange: (value?: IFilterOptions) => void;
}
