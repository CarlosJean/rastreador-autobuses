import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any = {};
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.user = this.loginService.user;

    if(this.user != null && this.user.charge != 'administrator' || this.user == null)
      this.router.navigate(['/rutas']);
  }

}
