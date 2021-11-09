export class Thumbnail {
    user: string;
    img: string;
    title: string;
    constructor(
        user: string,
        img: string,
        title: string,
    ) {
        this.user = user;
        this.img = img;
        this.title = title;
    }
}