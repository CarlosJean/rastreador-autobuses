import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { LoginService } from 'src/app/services/login/login.service';
import { LocationSendingComponent } from 'src/app/shared/location/location-sending/location-sending.component';

@NgModule({
  declarations: [RoutesComponent, RouteDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    RoutesRoutingModule,
  ],
  providers:[RoutesService,LoginService]
})
export class RoutesModule { }
