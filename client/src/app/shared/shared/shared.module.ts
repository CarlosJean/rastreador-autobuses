import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
/* Ng zorro */
import { LoginComponent } from '../login/login.component';
import { RealtimeMapComponent } from '../location/realtime-map/realtime-map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

/* Forms */
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
/* Forms */

@NgModule({
  declarations: [LoginComponent, RealtimeMapComponent],
  imports: [
    /* CommonModule, */
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
    NzFormModule,NzInputModule,ReactiveFormsModule,FormsModule/* ,BrowserAnimationsModule */
  ]
})
export class SharedModule { }
