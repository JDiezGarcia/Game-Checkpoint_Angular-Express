export class PostCommentConfig {
    type: string;
    id: string;
    reply:{
        is: string,
        comment?: string,
    };

    constructor(
        type: string,
        id: string,
        reply: {
            is: string,
            comment?: string,
        }
    ) {
        this.type = type;
        this.id = id;
        this.reply = reply;
    }
}