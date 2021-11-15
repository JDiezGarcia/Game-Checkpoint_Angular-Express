import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
    ApiService,
    GamesService,
    CategoriesService,
    AuthGuard,
    CommentsService,
    JwtService,
    ProfilesService,
    UserService,
    RolesGuardService
} from './services';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        ApiService,
        GamesService,
        AuthGuard,
        CategoriesService,
        CommentsService,
        JwtService,
        ProfilesService,
        UserService,
        RolesGuardService
    ]
})
export class CoreModule { }
