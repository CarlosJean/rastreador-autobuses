import { Injectable } from '@angular/core';
import { LocationService } from '../location/location.service';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  routeId:string = '';
  driverId: string = '';
  private navigatorId = 0; //Variable que almacena el id del navegador de geolocalización.

  constructor(private socket:Socket,private locationService:LocationService) { }

  emitLocation(){
    /* Función que envía la localización del conductor hacia el servidor. */

   this.navigatorId =  this.locationService.getLiveLocation((location)=>{

      //Obtenemos las coordenadas.
      let coordinates = {
        latitude:location.coords.latitude,
        longitude:location.coords.longitude,
        altitude:location.coords.altitude,
        accuracy:location.coords.accuracy,
        altitudeAccuracy:location.coords.altitudeAccuracy,
        heading:location.coords.heading,
        speed:location.coords.speed,
        timestamp:location.timestamp,
        driver: this.driverId,
        route: this.routeId
      }

      this.locationService.navigatorId = this.navigatorId;
      //Emitimos las coordenadas al servidor.
      this.socket.emit('location',coordinates);
    },()=>{
      console.error('Hubo un error al intentar enviar la localización del conductor.');
    });
  }

  stopLocationEmition(){
    //Función que detiene el envío de la localización hacia el servidor.
    navigator.geolocation.clearWatch(this.navigatorId);
  }

  getLocation(){
    return this.socket.fromEvent('location').pipe(map((data)=>data));
  }
  
}