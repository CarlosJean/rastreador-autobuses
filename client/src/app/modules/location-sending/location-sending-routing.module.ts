import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationSendingComponent } from './location-sending.component';

const routes: Routes = [{ path: '', component: LocationSendingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationSendingRoutingModule { }
