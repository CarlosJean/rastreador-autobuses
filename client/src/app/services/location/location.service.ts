import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  frequency = 3000;
  constructor(private socket:Socket) {}

  private sendLocation(location){
    let coordinates = {
      latitude:location.coords.latitude,
      longitude:location.coords.longitude,
      altitude:location.coords.altitude,
      accuracy:location.coords.accuracy,
      altitudeAccuracy:location.coords.altitudeAccuracy,
      heading:location.coords.heading,
      speed:location.coords.speed,
      timestamp:location.timestamp
    }
    this.socket.emit('location',coordinates);
  }

  getLocation(){
    return this.socket.fromEvent('location').pipe(map((data)=>data));
  }

  currentLocation(){
    setInterval(()=>{
      navigator.geolocation.getCurrentPosition((data)=>{
        this.sendLocation(data);
      })
    }, this.frequency);
  }
}
