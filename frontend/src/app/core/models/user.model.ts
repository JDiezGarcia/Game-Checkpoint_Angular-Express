export class User {
    email: string;
    user: string;
    name: string;
    img: string;
    title: string;
    token: string;
    role: string;

    constructor(
        email: string,
        user: string,
        name: string,
        img: string,
        title: string,
        token: string,
        role: string
    ) {
        this.email = email;
        this.user = user;
        this.name = name;
        this.img = img;
        this.title = title;
        this.token = token;
        this.role = role;
    }
}
