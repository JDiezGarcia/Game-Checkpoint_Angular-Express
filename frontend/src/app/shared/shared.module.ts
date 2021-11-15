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
import { PaginationComponent } from './pagination/pagination.component';
import { FiltersComponent } from './filters/filters.component';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { ShowRoleDirective } from './show-role.directive';
import { CommentsComponent } from './comments/comments.component';
import { PostCommentComponent } from './post-comment/post-comment.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameCardComponent,
    GameDetailsComponent,
    CarouselComponent,
    CategoryCardComponent,
    SearchBarComponent,
    UserButtonsComponent,
    PaginationComponent,
    CommentsComponent,
    FiltersComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    ShowRoleDirective,
    PostCommentComponent
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
    PaginationComponent,
    FiltersComponent,
    CommentsComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    RouterModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    ShowRoleDirective,
    PostCommentComponent
  ],
})
export class SharedModule {}
