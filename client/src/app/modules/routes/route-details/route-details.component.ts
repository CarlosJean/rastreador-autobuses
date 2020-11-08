import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { RoutesService } from 'src/app/services/routes/routes.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  user:any = {};
  route:any = {};
  drawerVisible:boolean = false;
  constructor(private routesService:RoutesService,private activatedRoute:ActivatedRoute,private loginService:LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.userLogged();
    this.activatedRoute.params.subscribe((param)=>{
      this.routesService.getRouteByInternalId(param.internalId).subscribe((route)=>{
        this.route = route[0];
      });
    });
  }

  /* private getLoggedUser(){
    
    console.log(this.user);
    //console.log(this.loginService.userLogged());
  } */

}
