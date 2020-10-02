import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSendingRoutingModule } from './location-sending-routing.module';
import { LocationSendingComponent } from './location-sending.component';


@NgModule({
  declarations: [LocationSendingComponent],
  imports: [
    CommonModule,
    LocationSendingRoutingModule
  ]
})
export class LocationSendingModule { }
