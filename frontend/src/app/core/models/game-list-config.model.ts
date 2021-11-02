import { GameFilters } from ".";
export class GameListConfig {

  type: string;
  user: string;
  filters: GameFilters;

  constructor(
    type: string = "all",
    user: string,
    filters: GameFilters = { 
        limit: 10,
        offset: 0
      }
  ) {
    this.type = type;
    this.user = user;
    this.filters = filters;
  }
}