import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteDetailsComponent } from './route-details/route-details.component';

import { RoutesComponent } from './routes.component';

const routes: Routes = [
  { path: '', component: RoutesComponent },
  { path: 'detalle/:internalId', component: RouteDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
