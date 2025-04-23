export type SortField = 'title' | 'artist' | 'album' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface TracksSortProps {
  sortOptions?: {
    by?: SortField;
    order?: SortOrder;
  };
  onChange: (value?: { by: SortField; order: SortOrder }) => void;
}
