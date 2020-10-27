import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { LocationService } from 'src/app/services/location/location.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-realtime-map',
  templateUrl: './realtime-map.component.html',
  styleUrls: ['./realtime-map.component.css']
})
export class RealtimeMapComponent implements OnInit {

  @Input() location:any = {};
  pool:Array<any> = [];
  private selectedDriver = null;
  drawerVisible:boolean = false;
  placement: NzDrawerPlacement = 'bottom';
  myLocationLatitude = 0;
  myLocationLongitude = 0;
  /* private selectedMarker = null; */

  constructor(private locationService:LocationService,private activatedRoute:ActivatedRoute,private loginService:LoginService) { }

  ngOnInit(): void {

    //Si el usuario logueado es invitado se obtiene la localización actual.
    if(this.loginService.user == null) this.myCurrentLocation();
    
    this.locationService.getLocation().subscribe((busLocation:any)=>{
      if(busLocation != null) this.addLocationToPool(busLocation);              
    });
    
  }

  addLocationToPool(busLocation:any){
    //Verificamos la ruta de la cual se quiere obtener información.
    this.activatedRoute.params.subscribe((param)=>{
      if(param.internalId == busLocation.route){
        let driverExists = this.pool.some((location)=>location.driver == busLocation.driver);
        if(driverExists){
          var removeIndex = this.pool.map(function(item) { return item.driver; }).indexOf(busLocation.driver);
          this.pool.splice(removeIndex, 1);
        }
        this.pool.push(busLocation);        
        let markerInfo = this.pool.filter((element)=>this.selectedDriver == element.driver);
        if(markerInfo.length > 0) this.getDistance(markerInfo);
        
      }  
    });
  }

  markerClick(driverId){
    this.selectedDriver = driverId;   
    this.drawerVisible = true; 
    console.log(this.drawerVisible);
  }

  getDistance(markerInfo){    
    navigator.geolocation.getCurrentPosition((location)=>{
      let origins = markerInfo[0].latitude+','+markerInfo[0].longitude;
      let destinations = location.coords.latitude + ',' + location.coords.longitude;
      this.myLocationLatitude = location.coords.latitude; 
      this.myLocationLongitude = location.coords.longitude; 
      this.locationService.distance(origins,destinations).subscribe((res)=>{
        console.log(res);
      });
    })
  }

  drawerClose(): void {
    this.drawerVisible = false;
  }

  myCurrentLocation(){
    this.locationService.getMyCurrentLocation((location)=>{
      this.myLocationLatitude = location.coords.latitude;
      this.myLocationLongitude = location.coords.longitude;
    });
  }
}
