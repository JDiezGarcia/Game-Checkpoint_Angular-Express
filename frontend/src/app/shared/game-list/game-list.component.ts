import { Component, Input } from '@angular/core';

import { Game, GameListConfig, GamesService } from '../../core';
@Component({
    selector: 'app-game-list',
    styleUrls: ['game-list.component.css'],
    templateUrl: './game-list.component.html'
})
export class GameListComponent {
    constructor(
        private gamesService: GamesService
    ) { }

    @Input() limit!: number;
    @Input()
    set config(config: GameListConfig) {
        if (config) {
            this.query = config;
            this.currentPage = 1;
            this.loadGames();
        }
    }
    //No carga
    ngOnInit(): void {
        this.loadGames();
      }
    query!: GameListConfig;
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

        // Create limit and offset filter (if necessary)
        // if (this.limit) {
        //     this.query.filters.limit = this.limit;
        //     this.query.filters.offset = (this.limit * (this.currentPage - 1));
        // }

        this.gamesService.query().subscribe(data => {
            console.log(data)
            this.loading = false;
            this.results = data.games;
            console.log(this.results, "ha")
            // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
            //this.totalPages = Array.from(new Array(Math.ceil(data.gameCount / this.limit)), (val, index) => index + 1);
        });
    }
}