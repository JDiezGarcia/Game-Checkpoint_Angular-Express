import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, GamesService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    GamesService
  ]
})
export class CoreModule { }
