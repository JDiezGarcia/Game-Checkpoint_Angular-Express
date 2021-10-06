import { GameFilters } from '.';

export class CarouselConfig {
  type: string;
  filters?: GameFilters;

  constructor(type: string, filters?: GameFilters) {
    this.type = type;
    this.filters = filters;
  }
}
