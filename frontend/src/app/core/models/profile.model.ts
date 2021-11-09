export class Profile {
    email: string;
    user: string;
    name: string;
    img: string;
    title: string;
    following: boolean;
    comments: Comment[];

    constructor(
        email: string,
        user: string,
        name: string,
        img: string,
        title: string,
        following: boolean,
        comments: Comment[]
    ) {
        this.email = email;
        this.user = user;
        this.name = name;
        this.img = img;
        this.title = title;
        this.following = following;
        this.comments = comments;
    }
}