import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { GameListComponent } from './game-list/game-list.component';
import { GameCardComponent } from './game-card/game-card.component';
import { RouterModule } from '@angular/router';
import { GameDetailsComponent } from './game-details/game-details.component';

@NgModule({
  declarations: [
    GameListComponent,
    GameCardComponent,
    GameDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  exports: [
    GameListComponent,
    GameCardComponent,
    GameDetailsComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    RouterModule,
  ]
})
export class SharedModule { }
