import { Component } from '@angular/core';

import { UserService , User} from '../../core';
@Component({
    selector: 'app-user-buttons',
    styleUrls: ['user-buttons.component.css'],
    templateUrl: './user-buttons.component.html',
})
export class UserButtonsComponent {
    constructor(
        private userService: UserService
    ) { }

    currentUser!: User;

    logout(){
        this.userService.purgeAuth();
    }

    ngOnInit() {
        this.userService.currentUser.subscribe(
            (userData) => {
                this.currentUser = userData;
            }
        );
    }
}
