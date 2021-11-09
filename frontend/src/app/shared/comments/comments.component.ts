import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { Comment, Thumbnail, User, UserService, PostCommentConfig, CommentsService } from '../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['comments.component.css']
})
export class CommentsComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private commentService: CommentsService
  ) {}

  private subscription!: Subscription;

  @Input() depth: number = 1;
  //No iba el Type comment puse any
  @Input() set comment(comment: any){
    this.commentData = comment;
    this.replies = comment.replies;
    this.canModify = comment.canModify;
    this.author = comment.author;
    this.orderReplies();
  };

  @Input() set postConfig(postConfig: PostCommentConfig){
    if(postConfig){
      this.commentConfig = JSON.parse(JSON.stringify(postConfig));
      this.commentConfig.reply.comment = this.commentData.id;
      this.commentConfig.reply.is = "yes";

    }
  };
  @Output() deleteComment = new EventEmitter<PostCommentConfig>();

  canModify!: boolean;
  replies!: Comment[];
  commentData!: Comment;
  author!: Thumbnail;
  commentConfig!: PostCommentConfig;
  id!: string;

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.user === this.author.user);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    let deleteConfig: PostCommentConfig = {
        type: this.commentConfig.type,
        id: this.commentConfig.id,
        reply: {
          is: "yes",
          comment: this.commentData.id
        }
      }

    this.deleteComment.emit(deleteConfig);
  }

  onDeleteReply(deleteConfig: PostCommentConfig) {

    this.commentService.destroy(deleteConfig.reply.comment as string, deleteConfig.id, deleteConfig.type)
      .subscribe(
        success => {
          this.replies = this.replies.filter((reply) => reply.id !== deleteConfig.reply.comment);
        }
      );
  }

  orderReplies() {
    this.replies.sort(function (a: Comment, b: Comment) {
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
  }

  onAddReply(reply: Comment) {
    this.replies.push(reply);
    this.orderReplies();
  }

}
