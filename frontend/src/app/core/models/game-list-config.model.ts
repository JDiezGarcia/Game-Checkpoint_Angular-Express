import { GameFilters } from ".";
export class GameListConfig {

  type: string;
  filters: GameFilters;

  constructor(
    type: string = "all",

    filters: GameFilters = { 
        limit: 10,
        offset: 0
      }
  ) {
    this.type = type;
    this.filters = filters;
  }
}