import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LocationService } from 'src/app/services/location/location.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-location-sending',
  templateUrl: './location-sending.component.html',
  styleUrls: ['./location-sending.component.css'],
  providers:[LoginService]
})
export class LocationSendingComponent implements OnInit {

  sendingLocation = false;
  loginModalVisible:boolean = false;
  
  constructor(private locationService:LocationService, private activatedRoute:ActivatedRoute, 
  private loginService:LoginService, private appComponent:AppComponent) { }

  ngOnInit(): void {
  }
  
  locationSending(){
    //Si el usuario no está logueado entonces se muestra el modal de login.
    if(!this.isDriverLogged()){
      this.loginModalVisible = true;
      return false;
    } 

    //Si el usuario está logueado se le permite enviar o detener el envío de la ubicación.
    if(this.sendingLocation){
      this.sendingLocation = false;
      this.locationService.stopLocalization();
    }else{
      this.sendingLocation = true;      
      let user = this.loginService.userLogged();

      this.activatedRoute.params.subscribe((param)=>{
        this.locationService.currentLocation(user.id,param.internalId);
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

  setUserData(userData:any){
    this.appComponent.setUserData(userData);
  }
}
