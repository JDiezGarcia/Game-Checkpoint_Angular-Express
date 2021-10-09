import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { RouterModule } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { SearchBarComponent } from './search/search-bar.component';
import { UserButtonsComponent } from './user-buttons/user-buttons.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameCardComponent,
    GameDetailsComponent,
    CarouselComponent,
    CategoryCardComponent,
    SearchBarComponent,
    UserButtonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule,
  ],
  exports: [
    GameListComponent,
    GameCardComponent,
    GameDetailsComponent,
    CarouselComponent,
    CategoryCardComponent,
    SearchBarComponent,
    UserButtonsComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    RouterModule,
  ],
})
export class SharedModule {}
