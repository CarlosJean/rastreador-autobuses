import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-location-sending',
  templateUrl: './location-sending.component.html',
  styleUrls: ['./location-sending.component.css']
})
export class LocationSendingComponent implements OnInit {

  sendingLocation = false;
  loginModalVisible:boolean = false;
  
  constructor(private locationService:LocationService, private activatedRoute:ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {
  }
  
  locationSending(){
    //Si el usuario no está logueado entonces se muestra el modal de login.
    if(!this.userLogged()){
      this.loginModalVisible = true;
      return false;
    } 

    //Si el usuario está logueado se le permite enviar o detener el envío de la ubicación.
    if(this.sendingLocation){
      this.sendingLocation = false;
      this.locationService.stopLocalization();
    }else{
      this.sendingLocation = true;      
      let user = JSON.parse(this.loginService.userLogged());

      this.activatedRoute.params.subscribe((param)=>{
        this.locationService.currentLocation(user.id,param.internalId);
      });
    }
  }

  private userLogged(){
    let user:any = JSON.parse(this.loginService.userLogged());
    if(user != null && user.charge == 'driver') return true;

    return false;
  }

  changeLoginModalState(state:boolean){
    this.loginModalVisible = state;
  }

}
