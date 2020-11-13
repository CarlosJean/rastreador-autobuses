import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RouteDetailsComponent } from 'src/app/modules/routes/route-details/route-details.component';
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
  userNotFound:boolean = false;

  /* identification:string = null;
  password:string = null; */
  login = new FormGroup({
    identification: new FormControl(''), 
    password: new FormControl('')
  });


  constructor(private loginService:LoginService, private message: NzMessageService/* , private routeDetails:RouteDetailsComponent */) { }

  ngOnInit(): void {
  }

  async handleOk(){
    let documentNumber = this.login.value.identification;
    let password = this.login.value.password;

    this.loginService.findUser(documentNumber,password).subscribe(userFound=>{ 

      if(userFound.length > 0){
        let UserData = userFound[0];
        sessionStorage.setItem('userData',JSON.stringify(UserData));
        //this.routeDetails.user = UserData;
        this.userData.emit(UserData);
        this.userNotFound = false;
        this.loginModalVisible.emit(false);
        this.message.success(`Bienvenido ${UserData.names} ${UserData.surnames}`);
        
      }else{
        this.userNotFound = true;
      }
    });    
  }

  handleCancel(){
    this.loginModalVisible.emit(false);
  }

  inputChange(){
    this.userNotFound = false;
  }
}
