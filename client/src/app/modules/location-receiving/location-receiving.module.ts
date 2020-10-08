import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationReceivingRoutingModule } from './location-receiving-routing.module';
import { LocationReceivingComponent } from './location-receiving.component';


@NgModule({
  declarations: [LocationReceivingComponent],
  imports: [
    CommonModule,
    LocationReceivingRoutingModule
  ]
})
export class LocationReceivingModule { }
