import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-sending',
  templateUrl: './location-sending.component.html',
  styleUrls: ['./location-sending.component.css']
})
export class LocationSendingComponent implements OnInit {

  sendingLocation = false;
  /* navigatorId:any=''; */

  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
  }
  
  locationSending(){
    if(this.sendingLocation){
      this.sendingLocation = false;
      this.locationService.stopLocalization();
      //document.getElementsByClassName('notToSendLocation')[0].setAttribute('class','sendLocation');
    }else{
      this.sendingLocation = true;      
      //this.locationService.currentLocation();
      //document.getElementsByClassName('sendLocation')[0].setAttribute('class','notToSendLocation');
    }
  }
}
