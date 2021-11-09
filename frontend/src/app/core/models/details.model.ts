export class Details {
    
    slug: string;
    name: string;
    description: string;
    categories: string[];
    img: string;
    baseHours: Number;
    universe: string;
    rating: {
        rating: number,
        votes: number
    };
    rate: number | boolean;
    status: string;
    comments: Comment[];
    isFavorite: boolean;

    constructor(
        slug: string,
        name: string,
        description: string,
        categories: string[],
        img: string,
        baseHours: number,
        universe: string,
        rating: {
            rating: number,
            votes: number
        },
        rate: number | boolean,
        status: string,
        comments: Comment[],
        isFavorite: boolean
    ) {
        this.slug = slug;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.img = img;
        this.baseHours = baseHours;
        this.universe = universe;
        this.rating = rating;
        this.rate = rate;
        this.status = status;
        this.comments = comments;
        this.isFavorite = isFavorite;
    }
}
