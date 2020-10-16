import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationSendingRoutingModule } from './location-sending-routing.module';
import { LocationSendingComponent } from './location-sending.component';

import {LocationService} from '../../services/location/location.service';

/* Ng Zorro */
/* import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid'; */
import { SharedModule } from 'src/app/shared/shared/shared.module';
/* Ng Zorro */

@NgModule({
  declarations: [LocationSendingComponent],
  imports: [
    CommonModule,
    LocationSendingRoutingModule,
    SharedModule
    /* Ng Zorro */
    /* NzCardModule, */
    /* NzGridModule */
    /* Ng Zorro */
  ],
  providers:[LocationService]
})
export class LocationSendingModule { }
