import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private firestore:AngularFirestore) { }

  findUser(documentNumber = null, password = null):Observable<any>{
    //Busca el usuario dado un número de documento y una contraseña.
    return this.firestore.collection('users',ref=>ref.where('document_number','==',documentNumber)
    .where('password','==',password)).valueChanges();
  }

  userLogged(){
    //Retorna el usuario logueado actualmente
    return JSON.parse(sessionStorage.getItem('userData'));
  }

  logout(){
    //Remueve el objeto usuario que está en el almacenamiento de la sesión.
    sessionStorage.removeItem('userData');
  }
}
