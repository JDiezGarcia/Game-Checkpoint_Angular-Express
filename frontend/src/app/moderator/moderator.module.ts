import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModeratorRoutingModule } from './moderator-routing.module';
import { ModeratorComponent } from './moderator.component';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ModeratorComponent
  ],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class ModeratorModule { }
