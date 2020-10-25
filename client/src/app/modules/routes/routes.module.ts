import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouteDetailsComponent } from './route-details/route-details.component';

@NgModule({
  declarations: [RoutesComponent, RouteDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    RoutesRoutingModule,
  ]
})
export class RoutesModule { }
