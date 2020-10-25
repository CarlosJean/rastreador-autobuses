import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private firestore:AngularFirestore) { }

  getRoutes():Observable<any>{
    //Se obtienen las rutas existentes en la base de datos.
    return this.firestore.collection('rutas').valueChanges();
  }

  getRouteByInternalId(internalId:string):Observable<any>{
    //Se obtiene información acerca de una determinada ruta.
    return this.firestore.collection('rutas',ref=>ref.where('internal_id','==', internalId)).valueChanges();
  }

  getDriverRoutes(idDriver:string):Observable<any>{
    return this.firestore.collection('driver-routes',ref=>ref.where('user_id','==',idDriver)).valueChanges();
  }

  getRouteById(routeId:string):Observable<any>{
    return this.firestore.collection('rutas',ref=>ref.where('id','==',routeId)).valueChanges();     
  }

}
