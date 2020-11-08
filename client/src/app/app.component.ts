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
  user:any = this.loginService.userLogged();
  
  constructor(private loginService:LoginService, private router:Router, private locationService:LocationService){
  }

  ngOnInit():void{ 
  }

  showLoginModal(){
    this.loginModalVisible = true;
  }

  loginModal(){
    this.loginModalVisible ? this.loginModalVisible = false : this.loginModalVisible = true;
  }

  changeLoginModalState(loginModalState:boolean){
    this.loginModalVisible = loginModalState;
  }

  logout(){
    this.loginService.logout();
    this.user = this.loginService.userLogged();
  }

  setUserData(userData:any){
    if(userData != null) this.user = userData;
  }

  confirm(){
    this.stopLocationSending();
    this.logout();
  }

  private stopLocationSending(){
    //Detiene el envío de la ubicación del conductor logueado
    let route = this.router.url.split('/')[2];
    if(this.user != null && this.user.charge == 'driver' && route == 'route-details')
      this.locationService.stopLocalization();
    
  }
}
