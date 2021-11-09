import { Comment } from '@angular/compiler';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, PostCommentConfig, CommentsService } from 'src/app/core';


@Component({
    selector: 'app-post-comment',
    styleUrls: ['post-comment.component.css'],
    templateUrl: './post-comment.component.html',
})
export class PostCommentComponent {
    constructor(
        private commentService: CommentsService
    ) { }

    @Output() addComment = new EventEmitter<any>();
    @Input() set config(config: PostCommentConfig) {
        if (config.reply.is === "yes") {
            this.type = "reply";
        } else {
            this.type = "comment";
        }
        this.currentConfig = JSON.parse(JSON.stringify(config));
    }

    currentUser!: User;
    commentControl = new FormControl();
    currentConfig!: PostCommentConfig;
    type!: string;

    newComment() {
        let commentBody: string = this.commentControl.value;
        let n: number = 0;
        let comment;
        commentBody = commentBody.trim()
            .replace(/(\n{3})+/g, '')
            .replace(/\n/g, () => n++ < 4 ? "<br/>" : '');

        if (this.currentConfig.reply.is === "yes") {
            this.commentService.reply(this.currentConfig.reply.comment as string, this.currentConfig.id, this.currentConfig.type, commentBody)
                .subscribe(data => {
                    comment = data;
                    this.addComment.emit(comment)
                });
        } else {
            this.commentService.add(this.currentConfig.id, this.currentConfig.type, commentBody)
                .subscribe(data => {
                    comment = data;
                    this.addComment.emit(comment)
                });
        }
        this.commentControl.reset('');

    }
}
