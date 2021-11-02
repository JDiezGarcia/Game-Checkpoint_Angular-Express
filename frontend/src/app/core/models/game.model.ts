export class Game {
    
    slug: string;
    name: string;
    img: string;
    status: string | boolean;

    constructor(
        slug: string,
        name: string,
        img: string,
        status: string | boolean
    ) {
        this.slug = slug;
        this.name = name;
        this.img = img;
        this.status = status;
    }
}
