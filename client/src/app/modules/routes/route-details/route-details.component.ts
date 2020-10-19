import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from 'src/app/services/routes/routes.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  route:any = {};
  constructor(private routesService:RoutesService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param)=>{
      this.routesService.getRoute(param.internalId).subscribe((route)=>{
        this.route = route[0];
        console.log(this.route);
      });
    });

  }

}
