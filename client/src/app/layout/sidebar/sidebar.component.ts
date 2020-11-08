import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() isCollapsed:boolean = true;
  loginModalVisible:boolean = false;
  user:any = {};

  constructor(private loginService:LoginService, private locationService:LocationService,private router:Router) { }

  ngOnInit(): void {
    this.user = this.loginService.userLogged();
  }

  showLoginModal(){
    this.loginModalVisible = true;
  }

  changeLoginModalState(loginModalState:boolean){
    this.loginModalVisible = loginModalState;
  }

  setUserData(userData:any){
    if(userData != null) this.user = userData;
  }

  confirmLogout(){
    this.stopLocationSending();
    this.logout();
  }

  cancelLogout(){}

  private logout(){
    this.loginService.logout();
    this.user = this.loginService.userLogged();
  } 
  private stopLocationSending(){
    //Detiene el envío de la ubicación del conductor logueado
    let route = this.router.url.split('/')[2];
    if(this.user != null && this.user.charge == 'driver' && route == 'route-details')
      this.locationService.stopLocalization();    
  }
}
