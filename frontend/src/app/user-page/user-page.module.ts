import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserPageRoutingModule
  ]
})
export class UserPageModule { }
