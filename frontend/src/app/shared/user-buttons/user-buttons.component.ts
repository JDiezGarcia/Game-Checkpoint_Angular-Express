import { Component } from '@angular/core';

import { GamesService } from '../../core';
@Component({
  selector: 'app-user-buttons',
  styleUrls: ['user-buttons.component.css'],
  templateUrl: './user-buttons.component.html',
})
export class UserButtonsComponent {
  constructor(private gamesService: GamesService) {}

  }
