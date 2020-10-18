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
/* Ng zorro */
import { LoginComponent } from '../login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    /* CommonModule, */
    /* BrowserAnimationsModule, */
    /* Ng Zorro */
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzListModule
    /* Ng Zorro */    
  ],
  exports:[
    NzCardModule,NzGridModule,NzButtonModule,NzIconModule,NzModalModule,LoginComponent,NzListModule/* ,BrowserAnimationsModule */
  ]
})
export class SharedModule { }
