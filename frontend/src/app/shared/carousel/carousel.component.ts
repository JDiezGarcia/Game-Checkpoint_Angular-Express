import { Component, Input } from '@angular/core';
import {
  Game,
  GamesService,
  CarouselConfig,
  CategoriesService,
  GameFilters,
} from '../../core';

@Component({
  selector: 'app-carousel',
  styleUrls: ['carousel.component.css'],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  constructor(
    private gamesService: GamesService,
    private categoriesService: CategoriesService
  ) {}

  @Input()
  set config(config: CarouselConfig) {
    if (config) {
      this.filters = config.filters;
      this.loadSlides(config.type);
    }
  }

  filters?: GameFilters;
  results!: Game[] | String[];
  slideGames!: Game[];
  slideCategories!: String[];

  loadSlides(type: String) {
    if (type === 'categories') {
      this.categoriesService.getAll().subscribe((data) => {
        this.slideCategories = data;
      });
    } else if (type === 'games') {
      this.gamesService.query(this.filters as any).subscribe((data) => {
        this.slideGames = data.games;
      });
    }
    console.log(this.slideCategories)
  }
  
}
