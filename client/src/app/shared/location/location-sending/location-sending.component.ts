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
  
  constructor(private locationService:LocationService, private activatedRoute:ActivatedRoute, private loginService:LoginService) { }

  ngOnInit(): void {
  }
  
  locationSending(){
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
}
