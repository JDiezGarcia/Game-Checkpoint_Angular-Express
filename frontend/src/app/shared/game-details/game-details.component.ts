import { Component, Input, OnInit } from '@angular/core';
import { GamesService, Game } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

    constructor(
        private gameService: GamesService,
        private route: ActivatedRoute
    ) { }

    @Input() slug!: string;
    @Input() game!: Game;

    loadGame() {

    };

    ngOnInit() {
    }


}
