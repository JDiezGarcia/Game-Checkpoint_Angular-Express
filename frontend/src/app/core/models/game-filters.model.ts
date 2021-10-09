export interface GameFilters {
  categories?: string[];
  favorited?: string;
  limit: number;
  offset: number;
  query?: string;
}

export class GameFilters {
  categories?: string[];
  favorited?: string;
  limit: number;
  offset: number;
  query?: string;

  constructor(
    categories?: string[],
    favorited?: string,
    limit: number = 10,
    offset: number = 0,
    query?: string
  ){
    this.categories = categories;
    this.favorited = favorited;
    this.limit = limit;
    this.offset = offset;
    this.query = query;
  }
}
