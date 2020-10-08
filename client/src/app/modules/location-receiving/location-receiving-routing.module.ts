import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationReceivingComponent } from './location-receiving.component';

const routes: Routes = [{ path: '', component: LocationReceivingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationReceivingRoutingModule { }
