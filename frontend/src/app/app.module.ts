import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { GamesModule } from './games/games.module';
import { DetailsModule } from './details/details.module';
import {FooterComponent, HeaderComponent, SharedModule} from './shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPageModule } from './user-page/user-page.module';
import { CoreModule} from './core/core.module';


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
    CoreModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
