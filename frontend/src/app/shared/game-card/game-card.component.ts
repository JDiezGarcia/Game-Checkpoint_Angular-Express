import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Game, GamesService } from '../../core';

@Component({
    selector: 'app-game-card',
    styleUrls: ['game-card.component.css'],
    templateUrl: './game-card.component.html'
})
export class GameCardComponent {

    constructor(
        private gamesService: GamesService,
    ) { }

    @Input() set game(game: Game) {
        this.infoGame = game;
    };

    infoGame!: Game;

    follow(slug: string) {
        console.log(this.infoGame);
        this.gamesService.gameFollow(slug, "pending").subscribe()
        this.infoGame.status = 'pending';
    }

    unfollow(slug: string) {
        this.gamesService.gameUnfollow(slug).subscribe();
        this.infoGame.status = false;
    }

    // // onToggleFavorite(favorited: boolean) {
    // //   this.game['favorited'] = favorited;

    // //   if (favorited) {
    // //     this.game['favoritesCount']++;
    // //   } else {
    // //     this.game['favoritesCount']--;
    // //   }
    // // }
}
