import { Component, OnInit } from '@angular/core';
import {RoutesService} from '../../services/routes/routes.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  routes:Array<any>;
  constructor(private routesService:RoutesService) { }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe((routes)=>{
      this.routes = routes;
    });
  }

}
