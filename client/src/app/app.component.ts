import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from './services/location/location.service';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  isCollapsed = true;
  loginModalVisible = false;
  year:number = 0;
  //user:any = this.loginService.userLogged();
  
  constructor(/* private loginService:LoginService, private router:Router, private locationService:LocationService */){
  }

  ngOnInit():void{ 
    this.year = new Date().getFullYear();
  }
}
