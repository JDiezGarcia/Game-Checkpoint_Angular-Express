import { Component } from '@angular/core';

import { GamesService } from '../../core';
@Component({
  selector: 'app-search-bar',
  styleUrls: ['search-bar.component.css'],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  constructor(private gamesService: GamesService) {}

  }
