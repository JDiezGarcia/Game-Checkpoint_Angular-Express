import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class UserPageModule { }
