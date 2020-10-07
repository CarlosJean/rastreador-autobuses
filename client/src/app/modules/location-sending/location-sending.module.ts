import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSendingRoutingModule } from './location-sending-routing.module';
import { LocationSendingComponent } from './location-sending.component';

import {LocationService} from '../../services/location/location.service';


@NgModule({
  declarations: [LocationSendingComponent],
  imports: [
    CommonModule,
    LocationSendingRoutingModule
  ],
  providers:[LocationService]
})
export class LocationSendingModule { }
