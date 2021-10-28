export class User {
    email: String;
    user: String;
    name: String;
    img: String;
    title: String;
    token: String;

    constructor(
        email: string,
        user: string,
        name: string,
        img: string,
        title: string,
        token: string
    ) {
        this.email = email;
        this.user = user;
        this.name = name;
        this.img = img;
        this.title = title;
        this.token = token;
    }
}
