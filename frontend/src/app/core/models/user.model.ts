import { Game } from './game.model';
import { Comment } from './comment.model';

export class User {
    email: String;
    user: String;
    name: String;
    img: String;
    gamesFollow: [{
        game: Game,
        status: String
    }];
    fav: Game[];
    followers: User[];
    follow: User[];
    comments: Comment[];

    constructor(
        email: string,
        user: string,
        name: string,
        img: string,
        gamesFollow: [{
            game: Game,
            status: string
        }],
        fav: Game[],
        followers: User[],
        follow: User[],
        comments: Comment[]
    ) {
        this.email = email;
        this.user = user;
        this.name = name;
        this.img = img;
        this.gamesFollow = gamesFollow;
        this.fav = fav;
        this.followers = followers;
        this.follow = follow;
        this.comments = comments;
    }
}
