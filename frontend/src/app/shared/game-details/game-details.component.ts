import { Component, Input } from '@angular/core';
import { GamesService, Details } from 'src/app/core';
import { GameFollowService } from 'src/app/graphQL/game-follow.graphql.service';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent {

    constructor(
        private gameService: GamesService,
        private gameFollowService: GameFollowService
    ) { }

    @Input() slug!: string;
    @Input() set details(details: Details) {
        if (details.status) {
            this.status = details.status[0].toUpperCase() + details.status.slice(1);
        } else {
            this.status = 'none';
        }
        this.favorite = details.isFavorite;
        this.game = details;
        this.votes = details.rating.votes ? details.rating.votes : 0;
        this.rating = details.rating.rating ? details.rating.rating : 0;
        this.createStars();
    };

    status!: string;
    favorite!: boolean;
    votes!: number;
    rating!: number;
    game!: Details;
    stars!: {
        fill: number,
        half: number,
        empty: number
    }

    counter(i: number) {
        return new Array(i);
    }

    createStars(){
        let num: string = this.rating.toString() === 'NaN' ? '0' : this.rating.toString();
        let numArr: Array<string> = num.split('.');
        let fill: number = parseInt(numArr[0]);
        let half: number = parseInt(numArr[1]);

        fill = fill ? fill : 0;
        half = half >= 5 ? 1 : 0;
        let empty: number = 5 - (fill + half);
        
        this.stars = {
            fill: fill,
            half: half,
            empty: empty
        }
    }

    changeStars(rate: number, action: string){
        let actualRate = this.game.rate as number;
        let newRating: number;
        this.votes = !isNaN(this.votes) ? this.votes : 0;
        if(action === 'delete'){
            newRating = (this.rating * this.votes - actualRate) / (this.votes - 1)
            this.rating = !isNaN(newRating ) ? newRating : 0;
            this.votes = this.votes - 1;
        }else if(action === 'change'){
            this.rating = (this.rating * this.votes - actualRate + rate) / this.votes;
        }else if(action === 'vote'){
            this.rating = (this.rating * this.votes + rate) / (this.votes + 1);
            this.votes = this.votes + 1;
        }
        this.createStars();
    }

    toogleFav() {
        if (this.favorite) {
            this.favorite = false;
            this.gameService.gameUnfavorite(this.game.slug).subscribe();
        } else {
            this.favorite = true;
            this.gameService.gameFavorite(this.game.slug).subscribe();
        }
    }

    changeStatus(status: string){
        if(this.status !== 'none'){
            this.gameFollowService.changeStatus(this.game.slug, status).subscribe((data) => {
                console.log(data)
            });
        }else{
            this.gameService.gameFollow(this.game.slug, status).subscribe();
        }
        this.status = status[0].toUpperCase() + status.slice(1);
    }

    unFollow(){
        this.gameService.gameUnfollow(this.game.slug).subscribe();
        this.status = 'none';
    }

    setVote(num: number){

        if(this.game.rate && this.game.rate != num ){
            this.gameService.gameChangeVote(this.game.slug, num).subscribe();
            this.changeStars(num, 'change');
        }else if(!this.game.rate){
            this.gameService.gameVote(this.game.slug, num).subscribe();
            this.changeStars(num, 'vote');
        }
        this.game.rate = num;
    }

    removeVote(){
        this.gameService.gameUnvote(this.game.slug).subscribe();
        this.changeStars(0, 'delete');
        this.game.rate = false;

    }
}
