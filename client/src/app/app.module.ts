
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';

/* Ng Zorro */
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Ng Zorro */



/* Shared */
import {SharedModule} from './shared/shared/shared.module';
/* Shared */

/* Environment */
import { environment } from '../environments/environment';
/* Environment */

/* Angular Fire */
import { AngularFireModule } from '@angular/fire';
/* Angular Fire */

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(environment.socketIO),
    HttpClientModule,
    /* Ng Zorro */
    NzLayoutModule,
    NzDividerModule,
    NzMenuModule,
    BrowserAnimationsModule,
    /* Ng Zorro */
    AngularFireModule.initializeApp(environment.firebase)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
