import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GamesModule } from './games/games.module';
import { DetailsModule } from './details/details.module';
import {FooterComponent, HeaderComponent, SharedModule} from './shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule} from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,FooterComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    GamesModule,
    DetailsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
