import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {LoginService} from '../../services/login/login.service';
/* import {Md5} from 'ts-md5/dist/md5'; */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() isVisible = false;
  @Output() loginModalVisible= new EventEmitter<boolean>();
  @Output() userData = new EventEmitter<any>();

  identification:string = null;
  password:string = null;
  login = new FormGroup({
    identification: new FormControl(''), 
    password: new FormControl('')
  })
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  async handleOk(){
    let documentNumber = this.login.value.identification;
    let password = this.login.value.password;

    this.loginService.checkUser(documentNumber,password).subscribe(user=>{ 
      let UserData = user[0];
      sessionStorage.setItem('userData',JSON.stringify(UserData));
      this.userData.emit(UserData);
    });

    this.loginModalVisible.emit(false);
  }

  handleCancel(){
    this.loginModalVisible.emit(false);
  }
}
