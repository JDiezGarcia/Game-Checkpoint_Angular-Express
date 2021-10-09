import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
import { DetailsResolver } from './details-resolver.service';

const routes: Routes = [
  {
    path: ':slug',
    component: DetailsComponent,
    resolve: {
      game: DetailsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule {}
