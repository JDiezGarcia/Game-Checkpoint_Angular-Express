import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService, Profile, GameListConfig } from '../core';
import { concatMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) { }

    profile!: Profile;
    currentUser!: User;
    isUser!: boolean;
    gamesStatus: string = 'playing';
    listConfig!: GameListConfig;
    statusCount = {
        playing: 0,
        pending: 0,
        finished: 0
    };

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
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    changeStatus(status: string) {
        this.gamesStatus = status;
        this.ngOnInit();
    }

    checkStatus(){
        switch (this.gamesStatus) {
            case "playing":
                if (this.statusCount.playing === 0){
                    this.changeStatus("pending");
                }
                break;
            case "pending":
                if (this.statusCount.pending === 0) {
                    this.changeStatus("finished");
                }
                break;
            case "finished":
                if (this.statusCount.playing === 0) {
                    this.changeStatus("none");
                }
                break;
        }
    }
    onToggleFollowing(following: boolean) {
        this.profile.following = following;
    }

}
