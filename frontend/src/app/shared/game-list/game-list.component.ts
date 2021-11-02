import { Component, Input, EventEmitter, Output } from '@angular/core';
import { 
    Game, 
    GameListConfig, 
    GamesService, 
    GameFilters, 
    ProfilesService 
} from '../../core';

@Component({
    selector: 'app-game-list',
    styleUrls: ['game-list.component.css'],
    templateUrl: './game-list.component.html',
})
export class GameListComponent {

    constructor(
        private gamesService: GamesService,
        private profileService: ProfilesService
    ) { }

    @Output() setTotalGame = new EventEmitter();
    @Output() setStatus = new EventEmitter();
    @Input() set config(config: GameListConfig) {
        if (config) {
            console.log(config.type)
            this.query = config.filters;
            this.type = config.type;
            this.user = config.user;
            this.loadGames();
        }
    }

    type!: string;
    user!: string;
    query!: GameFilters;
    results: Game[] = [];
    loading: boolean = false;

    removeGame(slug: string){
        console.log(this.results)
        let game: Game | undefined = this.results.find(g => g.slug == slug);
        let i = this.results.indexOf(game as Game);
        this.results.splice(i, 1);
        console.log(i)
    }
    loadGames() {
        this.loading = true;
        this.results = [];
        if (this.type === 'all') {
            this.gamesService.query(this.query).subscribe((data) => {
                this.loading = false;
                this.results = data.games;
                this.setTotalGame.emit(data.gamesCount);
            });
        } else {
            this.profileService.query(this.user, this.type).subscribe((data) => {
                this.loading = false;
                this.results = data.games;
                this.setStatus.emit(data.gamesCounts)
            })
        }
    }
}