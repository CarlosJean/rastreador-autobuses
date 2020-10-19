import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private firestore:AngularFirestore) { }

  getRoutes():Observable<any>{
    //Se obtienen las rutas existentes en la base de datos.
    return this.firestore.collection('rutas').valueChanges();
  }

  getRoute(internalId:string):Observable<any>{
    //Se obtiene información acerca de una determinada ruta.
    return this.firestore.collection('rutas',ref=>ref.where('internal_id','==', internalId)).valueChanges();
  }
}
