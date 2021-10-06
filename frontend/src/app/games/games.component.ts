import { Component, OnInit } from '@angular/core';
import { GameListConfig } from '../core';
@Component({
  selector: 'app-games-page',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  constructor(
  ) {}

  listConfig: GameListConfig = new GameListConfig;

 ngOnInit(): void{
   this.setListTo();
 }

  setListTo(config: GameListConfig = new GameListConfig) {
    // If feed is requested but user is not authenticated, redirect to login
    // Otherwise, set the list object
    this.listConfig = config;
  }
}
