import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GamesModule } from './games/games.module';
import { DetailsModule } from './details/details.module';
import { ModeratorModule } from './moderator/moderator.module'
import {FooterComponent, HeaderComponent, SharedModule} from './shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPageModule } from './user-page/user-page.module';
import { CoreModule} from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from './graphQL/graphql.module';


@NgModule({
  declarations: [
    AppComponent,FooterComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule,
    GamesModule,
    DetailsModule,
    UserPageModule,
    ModeratorModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
