import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
    User,
    UserService,
    Profile,
    GameListConfig,
    ProfilesService,
    PostCommentConfig,
    CommentsService,
    Comment
} from '../core';
import { concatMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private profileService: ProfilesService,
        private router: Router,
        private commentService: CommentsService
    ) { }

    profile!: Profile;
    comments!: Comment[];
    currentUser!: User;
    isUser!: boolean;
    gamesStatus: string = 'playing';
    listConfig!: GameListConfig;
    statusCount = {
        playing: 0,
        pending: 0,
        finished: 0
    };
    commentConfig!: PostCommentConfig;

    setStatus(status: any) {
        this.statusCount = status;
        this.checkStatus();
    }

    ngOnInit() {
        this.route.data.pipe(
            concatMap((data: any = { profile: Profile }) => {
                this.profile = data.profile;
                // Load the current user's data.
                return this.userService.currentUser.pipe(tap(
                    (userData: User) => {
                        this.currentUser = userData;
                        this.isUser = (this.currentUser.user === this.profile.user);
                    }
                ));
            })
        ).subscribe();

        this.listConfig = {
            type: this.gamesStatus,
            user: this.profile.user,
            filters: {
                limit: 3,
                offset: 0
            },
        };

        this.commentConfig = {
            type: 'user',
            id: this.profile.user,
            reply: {
                is: "no"
            }
        }

        this.comments = this.profile.comments as any;
        this.orderComments();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    orderComments(){
        this.comments.sort(function (a: Comment, b: Comment) {
            return +new Date(b.createdAt) - +new Date(a.createdAt);
        });
    }

    changeStatus(status: string) {
        this.gamesStatus = status;
        this.ngOnInit();
    }

    checkStatus() {
        switch (this.gamesStatus) {
            case "playing":
                if (this.statusCount.playing === 0) {
                    this.changeStatus("pending");
                }
                break;
            case "pending":
                if (this.statusCount.pending === 0) {
                    this.changeStatus("finished");
                }
                break;
            case "finished":
                if (this.statusCount.finished === 0) {
                    this.changeStatus("none");
                }
                break;
        }
    }

    toggleFollowing(following: boolean) {

        if (following) {
            this.profileService.follow(this.profile.user).subscribe();
        } else {
            this.profileService.unfollow(this.profile.user).subscribe();
        }
        this.profile.following = following;
    }

    onDeleteComment(deleteConfig: PostCommentConfig) {

        this.commentService.destroy(deleteConfig.reply.comment as string, deleteConfig.id, deleteConfig.type)
            .subscribe(
                success => {
                    this.comments = this.comments.filter((comment) => comment.id !== deleteConfig.reply.comment);
                }
            );
    }
    onAddComment(comment: Comment) {
        this.comments.push(comment);
        this.orderComments();
    }
}
