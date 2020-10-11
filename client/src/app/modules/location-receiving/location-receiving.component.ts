import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-receiving',
  templateUrl: './location-receiving.component.html',
  styleUrls: ['./location-receiving.component.css']
})
export class LocationReceivingComponent implements OnInit {

  duration:string = '0 min';
  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
    this.locationService.getLocation().subscribe(busLocation=>{
      //Obtener la localización del pasajero.
      navigator.geolocation.watchPosition((data)=>{
        let origin = data.coords.latitude+','+data.coords.longitude;
        let destination = busLocation['latitude']+','+ busLocation['longitude'];
        this.getDuration(origin,destination);
      });
    });
  }

  getDuration(origin='',destination=''){
    this.locationService.distance(origin,destination).subscribe(data=>{
      this.duration = data.message;
    });
  }
}
