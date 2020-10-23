import { Component } from '@angular/core';
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
  user:any = {};

  constructor(private loginService:LoginService){}

  ngOnInit():void{
    this.user = JSON.parse(this.loginService.userLogged());
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
    console.log(userData);
    if(userData != null) this.user = userData;
  }
}
