import { Component, Input } from '@angular/core';

import { Game, GameListConfig, GamesService, GameFilters } from '../../core';
@Component({
  selector: 'app-game-list',
  styleUrls: ['game-list.component.css'],
  templateUrl: './game-list.component.html',
})
export class GameListComponent {
  constructor(private gamesService: GamesService) {}

  @Input()
  set config(config: GameListConfig) {
    if (config) {
      this.query = config.filters;
      this.currentPage = 1;
      this.loadGames();
    }
  }

  query!: GameFilters;
  results: Game[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadGames();
  }

  loadGames() {
    this.loading = true;
    this.results = [];

    if (this.query.limit) {
      this.query.offset = this.query.limit * (this.currentPage - 1);
    }

    this.gamesService.query(this.query).subscribe((data) => {
      console.log(data);
      this.loading = false;
      this.results = data.games;
      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      //this.totalPages = Array.from(new Array(Math.ceil(data.gameCount / this.limit)), (val, index) => index + 1);
    });
  }
}
