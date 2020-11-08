import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
/* Ng zorro */
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
/* Ng zorro */
import { LoginComponent } from '../login/login.component';
import { RealtimeMapComponent } from '../location/realtime-map/realtime-map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

/* Forms */
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LocationSendingComponent } from '../location/location-sending/location-sending.component';
/* Forms */

/* Services */
import {DriverService} from '../../services/driver/driver.service';
/* Services */

@NgModule({
  declarations: [LoginComponent, RealtimeMapComponent, LocationSendingComponent],
  imports: [
    CommonModule,
    /* BrowserAnimationsModule, */
    /* Ng Zorro */
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzListModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzDrawerModule,
    NzAlertModule,
    NzMessageModule,
    NzPopconfirmModule,
    /* Ng Zorro */     
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    NzCardModule,NzGridModule,NzButtonModule,NzIconModule,NzModalModule,
    LoginComponent,NzListModule,RealtimeMapComponent,NzDividerModule,AgmCoreModule,
    NzFormModule,NzInputModule,ReactiveFormsModule,FormsModule,LocationSendingComponent,NzDrawerModule,NzAlertModule,
    NzMessageModule,NzPopconfirmModule
  ],
  providers:[
    DriverService
  ]
})
export class SharedModule { }
