import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  serverUrl = 'http://localhost:3000';
  navigatorId = 0;

  constructor(private socket:Socket, private http:HttpClient) {}

  getLocation(){
    //Obtiene la ubicación desde el servidor.
    return this.socket.fromEvent('location').pipe(map((data)=>data));
  }

  currentLocation(){
    //Obtiene la ubicación actual de la app cliente.
   this.navigatorId=  navigator.geolocation.watchPosition((location)=>{
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
    });
  }

  stopLocalization(){
    console.log(this.navigatorId);
    navigator.geolocation.clearWatch(this.navigatorId);
  }

  distance(origin='',destination=''):Observable<any> {

    //Función para obtener ls datos de la distancia entre dos ubicaciones.
    let distanceUrl= this.serverUrl+'/distance';
    let params = new HttpParams().set('origins',origin).set('destinations',destination);

    return this.http.get(distanceUrl,{params:params});    
  }

}
