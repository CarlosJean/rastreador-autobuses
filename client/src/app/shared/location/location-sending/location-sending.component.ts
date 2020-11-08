import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LocationService } from 'src/app/services/location/location.service';
import { LoginService } from 'src/app/services/login/login.service';
import {SidebarComponent} from 'src/app/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-location-sending',
  templateUrl: './location-sending.component.html',
  styleUrls: ['./location-sending.component.css'],
  /* providers:[LoginService] */
})
export class LocationSendingComponent implements OnInit {

  sendingLocation = false;
  loginModalVisible:boolean = false;
  
  constructor(private activatedRoute:ActivatedRoute, 
  private loginService:LoginService, /* private sidebarComponent:SidebarComponent, */ private driverService:DriverService) { }

  ngOnInit(): void {
  }
  
  locationSending(){
    //Si el usuario no está logueado entonces se muestra el modal de login.
    if(!this.isDriverLogged()){
      this.loginModalVisible = true;
      return false;
    } 

    //Si el usuario logueado es un conductor se le permite enviar o detener el envío de la ubicación.
    if(this.sendingLocation){
      this.sendingLocation = false;
      this.driverService.stopLocationEmition();
    }else{
      this.sendingLocation = true;      
      let user = this.loginService.userLogged();

      this.activatedRoute.params.subscribe((param)=>{
        this.driverService.routeId = param.internalId;
        this.driverService.driverId = user.id;
        this.driverService.emitLocation();
        //this.locationService.currentLocation(user.id,param.internalId);
      });
    }
  }

  private isDriverLogged(){
    let user:any = this.loginService.userLogged();
    if(user != null && user.charge == 'driver') return true;

    return false;
  }

  changeLoginModalState(state:boolean){
    //Cambia el estado del modal de login, es decir si se debe mostrar o no.
    this.loginModalVisible = state;
  }

  /* setUserData(userData:any){
    this.sidebarComponent.setUserData(userData);
  } */
}
