import { Component, Input, EventEmitter, Output} from '@angular/core';

import { Game, GameListConfig, GamesService, GameFilters } from '../../core';
@Component({
  selector: 'app-game-list',
  styleUrls: ['game-list.component.css'],
  templateUrl: './game-list.component.html',
})
export class GameListComponent {
  constructor(private gamesService: GamesService) {}
  @Output() setTotalGame = new EventEmitter();
  @Input()
  set config(config: GameListConfig) {
    if (config) {
      this.query = config.filters;
      this.loadGames();
    }
  }

  query!: GameFilters;
  results: Game[] = [];
  loading: boolean = false;

  loadGames() {
    this.loading = true;
    this.results = [];

    this.gamesService.query(this.query).subscribe((data) => {
      this.loading = false;
      this.results = data.games;
      this.setTotalGame.emit(data.gamesCount);
      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      //this.totalPages = Array.from(new Array(Math.ceil(data.gameCount / this.limit)), (val, index) => index + 1);
    });
  }
}
