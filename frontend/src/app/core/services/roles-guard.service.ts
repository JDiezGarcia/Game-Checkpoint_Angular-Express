import { Injectable } from '@angular/core';
import { UserService} from '.';
import { User } from '../models'

@Injectable({
    providedIn: 'root'
})
export class RolesGuardService {
    constructor(private userService: UserService) { }

    isAuthorized(allowedRoles: string[]): boolean {
        // check if the list of allowed roles is empty, if empty, authorize the user to access the page
        if (allowedRoles == null || allowedRoles.length === 0) {
            return true;
        }

        // decode token to read the payload details
        let user: User = this.userService.getCurrentUser();


        // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
        return allowedRoles.includes(user['role']);
    }
}
