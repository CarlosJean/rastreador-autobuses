import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore:AngularFirestore) { }

   async access(documentNumber=null, password=null):Promise<any>{
     let json = {};

    if(documentNumber == null || password == null) json = JSON.stringify({ status: 400, message: 'Número de cédula o contraseña no deben ser nulos.' });
  
     this.checkUser().subscribe((user) => {
      if (user.length == 0) json = JSON.stringify({ status: 204, message: 'Usuario no encontrado.' });
      
      json = JSON.stringify({ status: 200, message: 'Bienvenido.' });

    });

    return json;
  }

  checkUser(documentNumber = null, password = null):Observable<any>{
    return this.firestore.collection('users',ref=>ref.where('document_number','==',documentNumber)
    .where('password','==',password)).valueChanges();
  }

  userLogged(){
    return sessionStorage.getItem('userData');
  }

  logout(){
    sessionStorage.removeItem('userData');
  }
}
