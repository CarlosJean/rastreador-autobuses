import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any = {};

  constructor(private firestore:AngularFirestore) { 
    this.user = this.userLogged();
  }

  async access(documentNumber=null, password=null):Promise<any>{
     let json = {};

    if(documentNumber == null || password == null) json = JSON.stringify({ status: 400, message: 'Número de cédula o contraseña no deben ser nulos.' });
  
     this.findUser().subscribe((user) => {
      if (user.length == 0) json = JSON.stringify({ status: 204, message: 'Usuario no encontrado.' });
      
      json = JSON.stringify({ status: 200, message: 'Bienvenido.' });

    });

    return json;
  }

  findUser(documentNumber = null, password = null):Observable<any>{
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
