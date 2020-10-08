import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-receiving',
  templateUrl: './location-receiving.component.html',
  styleUrls: ['./location-receiving.component.css']
})
export class LocationReceivingComponent implements OnInit {

  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
    this.locationService.getLocation().subscribe(data=>{
      console.log(data);
    });
  }

}
