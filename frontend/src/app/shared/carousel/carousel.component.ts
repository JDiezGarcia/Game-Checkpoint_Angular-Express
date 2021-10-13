import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Game,
  GamesService,
  CarouselConfig,
  CategoriesService,
  GameFilters,
  Category
} from '../../core';

@Component({
  selector: 'app-carousel',
  styleUrls: ['carousel.component.css'],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  constructor(
    private gamesService: GamesService,
    private categoriesService: CategoriesService,
    private router: Router
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
  slideGames!: Game[][];
  slideCategories!: Category[][];

  loadSlides(type: String) {
    if (type === 'categories') {
      this.categoriesService.getAll().subscribe((data) => {
        console.log(data)
        this.slideCategories = this.splitToGroups(data);
      });
    } else if (type === 'games') {
      this.gamesService.query(this.filters as any).subscribe((data) => {
        this.slideGames = this.splitToGroups(data.games);
      });
    }
  }
  
  splitToGroups<Type>(data: Type[], perGroup: Number = 2): Type[][] {
    return data.reduce(
      (data, newData) => {
        let lastPage: Type[] = data[data.length - 1];
        if (lastPage.length < perGroup) {
          lastPage.push(newData);
        } else {
          data.push([newData]);
        }
        return data;
      },
      [[]] as Type[][]
    );
  }

  redirect(category: string){
    this.router.navigate(['/games'], { queryParams: { categories: category }})
  }
}
