export class Game {
    slug: String;
    name: String;
    description: String;
    categories: String[];
    img: String;
    baseHours: Number;
    universe: String;
    rating: Number;

    constructor(
        slug: string,
        name: string,
        description: string,
        categories: string[],
        img: string,
        baseHours: number,
        universe: string,
        rating: number
    ) {
        this.slug = slug;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.img = img;
        this.baseHours = baseHours;
        this.universe = universe;
        this.rating = rating;
    }
}
