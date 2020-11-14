import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  serverUrl = environment.server_url;
  navigatorId = 0;
  
  readonly inactiveTimeLimit = 3; //Limite de tiempo (en minutos) que un conductor puede estar inactivo sin enviar ubicación.
  
  constructor(private http:HttpClient) {}

  stopLocalization(){
    navigator.geolocation.clearWatch(this.navigatorId);
  }

  distance(origin='',destination=''):Observable<any> {

    //Función para obtener ls datos de la distancia entre dos ubicaciones.
    let distanceUrl= this.serverUrl+'/distance';
    let params = new HttpParams().set('origins',origin).set('destinations',destination);

    return this.http.get(distanceUrl,{params:params});    
  }

  getCurrentLocation(successCallback,errorCallback){
    return navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
  }

  getLiveLocation(successCallback,errorCallback){
    return navigator.geolocation.watchPosition(successCallback,errorCallback);
  }

}
