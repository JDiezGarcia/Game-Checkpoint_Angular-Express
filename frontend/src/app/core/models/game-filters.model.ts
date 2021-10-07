export interface GameFilters {
  categories?: string[];
  favorited?: string;
  limit: number;
  offset: number;
  query?: string;
}
