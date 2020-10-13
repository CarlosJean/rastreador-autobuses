
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';

/* Ng Zorro */
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
/* Ng Zorro */

/* Socket IO Config */
const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {origins: 'allowedOrigins'} };
/* Socket IO Config */

/* Shared */
import {SharedModule} from './shared/shared/shared.module';
/* Shared */

/* import { NzLayoutModule } from 'ng-zorro-antd/layout'; */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    /* NzLayoutModule, */
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    /* Ng Zorro */
    NzLayoutModule,
    NzGridModule,
    NzIconModule,
    NzDividerModule,
    NzMenuModule
    /* Ng Zorro */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
