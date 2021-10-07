import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, GamesService, CategoriesService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    GamesService,
    CategoriesService
  ]
})
export class CoreModule { }
