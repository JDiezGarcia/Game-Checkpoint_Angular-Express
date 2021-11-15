import { Component, OnInit } from '@angular/core';
import { CommentsService, Details, PostCommentConfig, Comment } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private commentService: CommentsService,
    ) { }

    game!: Details;
    comments!: Comment[];
    commentConfig!: PostCommentConfig;

    ngOnInit() {
        this.route.data.subscribe(
            (data => {
                this.game = data.game;
                this.comments = data.game.comments;
            }))
        this.commentConfig = {
            type: "game",
            id: this.game.slug,
            reply: {
                is: "no"
            }
        }
        this.orderComments();
    }

    orderComments() {
        this.comments.sort(function (a: Comment, b: Comment) {
            return +new Date(b.createdAt) - +new Date(a.createdAt);
        });
    }

    onDeleteComment(deleteConfig: PostCommentConfig) {
        this.commentService.destroy(deleteConfig.reply.comment as string, deleteConfig.id, deleteConfig.type)
            .subscribe(
                success => {
                    this.comments = this.comments.filter((comment) => comment.id !== deleteConfig.reply.comment);
                }
            );
    }

    onAddComment(comment: Comment){
        this.comments.push(comment);
        this.orderComments();
    }
}
