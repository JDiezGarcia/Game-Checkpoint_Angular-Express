import { User } from './user.model';

export class Comment {
    title: String;
    content: String;
    replies: Comment[];
    author: User;

    constructor(
        title: string,
        content: string,
        replies: Comment[],
        author: User,
    ) {
        this.title = title;
        this.content = content;
        this.replies = replies;
        this.author = author;
    }
}