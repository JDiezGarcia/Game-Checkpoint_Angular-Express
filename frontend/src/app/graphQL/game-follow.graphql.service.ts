import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';


const CHANGE_STATUS = gql`
    mutation changeStatus($config: gameStatus){
        changeStatus(config: $config){
            success
            me{
                name
                gamesFollow{
                    _id{
                    name
                    }
                        status
                }
            }
	    }
    }
`;

@Injectable({
    providedIn: 'root',
})
export class GameFollowService {
    constructor(private apollo: Apollo) { }

    changeStatus(slug: string, newStatus: string): Observable<any> {
        return this.apollo.mutate({
            mutation: CHANGE_STATUS,
            variables: {
                config: {
                    "slug": slug,
                    "newStatus": newStatus
                }
            }
        })
    }
    // getUsers(): Observable<any> {
    //     return this.apollo.watchQuery<any>({
    //         query: USERS,
    //     }).valueChanges;
    // }

    // getUser(id: any): Observable<any> {
    //     return this.apollo.watchQuery<any>({
    //         query: USER,
    //         variables: {
    //             id: id,
    //         },
    //     }).valueChanges;
    // }

    // addUser(id: any, username: string, city: string): Observable<any> {
    //     return this.apollo.mutate({
    //         mutation: ADD_USER,
    //         variables: {
    //             id: id,
    //             username: username,
    //             city: city,
    //         },
    //     });
    // }
    // login(username: string, password: string): Observable<any> {
    //     return this.apollo.watchQuery({
    //         query: LOGIN,
    //         variables: {
    //             username: username,
    //             password: password,
    //         },
    //     }).valueChanges;
    // }
}
