import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-location-sending',
  templateUrl: './location-sending.component.html',
  styleUrls: ['./location-sending.component.css']
})
export class LocationSendingComponent implements OnInit {

  constructor(private locationService:LocationService) { }

  ngOnInit(): void {
    this.locationService.currentLocation();
  }
}
