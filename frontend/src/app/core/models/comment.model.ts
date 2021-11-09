import { Thumbnail } from './thumbnail.model';

export class Comment {
    id: string;
    title: string;
    content: string;
    replies: Comment[];
    author: Thumbnail;
    canModify: boolean;
    createdAt: string;

    constructor(
        id: string,
        title: string,
        content: string,
        replies: Comment[],
        author: Thumbnail,
        canModify: boolean,
        createdAt: string
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.replies = replies;
        this.author = author;
        this.canModify = canModify;
        this.createdAt = createdAt;
    }
}