export class Profile {
    email: string;
    user: string;
    name: string;
    img: string;
    title: string;
    following: boolean;

    constructor(
        email: string,
        user: string,
        name: string,
        img: string,
        title: string,
        following: boolean
    ) {
        this.email = email;
        this.user = user;
        this.name = name;
        this.img = img;
        this.title = title;
        this.following = following;
    }
}