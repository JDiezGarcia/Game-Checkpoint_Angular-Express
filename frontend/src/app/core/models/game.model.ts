import {Comment} from './comment.model';

export class Game {
    
    slug: String;
    name: String;
    description: String;
    categories: String[];
    img: String;
    baseHours: Number;
    universe: String;
    rating: Number;
    comments: Comment[];

    constructor(
        slug: string,
        name: string,
        description: string,
        categories: string[],
        img: string,
        baseHours: number,
        universe: string,
        rating: number,
        comments: Comment[]
    ) {
        this.slug = slug;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.img = img;
        this.baseHours = baseHours;
        this.universe = universe;
        this.rating = rating;
        this.comments = comments;
    }
}
