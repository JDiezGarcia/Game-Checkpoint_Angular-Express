import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsResolver } from './details-resolver.service';
import { SharedModule } from '../shared';
import { DetailsRoutingModule } from './details-routing.module';


@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailsRoutingModule
  ],
  providers: [
    DetailsResolver
  ]
})
export class DetailsModule {}
