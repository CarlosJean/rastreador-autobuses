import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { LoginService } from 'src/app/services/login/login.service';
import {RoutesService} from '../../services/routes/routes.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  user:any = {};
  routes:Array<any> = [];
  constructor(private routesService:RoutesService, private loginService:LoginService) { }

  ngOnInit():void {

    //Verificamos si hay usuario logueado.
    this.user = this.loginService.user;

    console.log(this.user);

    if(this.user!=null && this.user.charge == 'driver'){
      console.log('User is driver!');
      this.driverRoute(this.user);
    }else{
      this.routesService.getRoutes().subscribe((routes)=>{
        this.routes = routes;
      })
    }
  }

  private driverRoute(user){
    this.routesService.getDriverRoutes(user.id).subscribe(driverRoutes=>{
      driverRoutes.forEach(driverRoute => {
        this.routesService.getRouteById(driverRoute.route_id).subscribe((route)=>{
          this.routes.push(route[0]);          
        });    
      });
    });
  }  
}
