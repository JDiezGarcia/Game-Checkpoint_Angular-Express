import { Component, Input } from '@angular/core';

import { Game } from '../../core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html'
})
export class GameCardComponent {
  @Input() game!: Game;

  // // onToggleFavorite(favorited: boolean) {
  // //   this.game['favorited'] = favorited;

  // //   if (favorited) {
  // //     this.game['favoritesCount']++;
  // //   } else {
  // //     this.game['favoritesCount']--;
  // //   }
  // // }
}
