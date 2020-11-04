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
  pool:Array<any> = []; //Variable que almacena la ubicación de los conductores de una ruta dada.
  private selectedDriver = null;
  drawerVisible:boolean = false;
  placement: NzDrawerPlacement = 'bottom';
  myLocationLatitude = 0;
  myLocationLongitude = 0;
  /* private selectedMarker = null; */

  markerInfo:any = {}; //Almacena los datos del conductor, dependiendo del marcador seleccionado.

  //Marcador de autobus
  passengerIcon = { url: '../../assets/icons/blue-map-marker.png', scaledSize: {height: 40, width: 25}}
  busIcon = { url: '../../assets/icons/autobus.png', scaledSize: {height: 40, width: 40}}

  constructor(private locationService:LocationService,private activatedRoute:ActivatedRoute,private loginService:LoginService) { }

  ngOnInit(): void {

    //Si el usuario logueado es invitado se obtiene la localización actual.
    if(this.loginService.userLogged() == null) this.myCurrentLocation();
    
    this.locationService.getDriversLocation().subscribe((busLocation:any)=>{
      if(busLocation != null) this.addLocationToPool(busLocation);              
    });
    
    //Cada 5 minutos se eliminan del pool los conductores que no están enviando su ubicación.
    setInterval(()=>{
      this.eliminateInactiveDrivers(this.pool);
    },3000);

  }

  addLocationToPool(busLocation:any){
    //Verificamos la ruta de la cual se quiere obtener información.
    this.activatedRoute.params.subscribe((param)=>{
      if(param.internalId == busLocation.route){
        let driverExists = this.pool.some((location)=>location.driver == busLocation.driver);
        if(driverExists){
          //Si el conductor ya existe en el pool entonces se remueve para volver a introducir la información de su localización.
          var removeIndex = this.pool.map(function(item) { return item.driver; }).indexOf(busLocation.driver);
          this.pool.splice(removeIndex, 1);
        }

        this.pool.push(busLocation);    
        
        this.markerInfo = this.pool.filter((element)=>this.selectedDriver == element.driver);
        if(this.markerInfo.length > 0) this.getDistance(this.markerInfo);        
      }  
    });
  }

  markerClick(driverId){
    this.selectedDriver = driverId;   
    this.drawerVisible = true; 
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

  eliminateInactiveDrivers(pool:Array<any>){
    /* Función que elimina del pool la ubicación de los conductores que han dejado de emitir su ubicación.*/

    if(pool.length > 0){
      pool.forEach((locationData)=>{
  
        let timeDiff = Date.now() - locationData.timestamp;
        let minuteDiference = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
  
        //Si el tiempo de envío de cierta ubicación es igual o excede los 5 minutos entonces se remueve del pool.
        if(this.locationService.inactiveTimeLimit <= minuteDiference){
          let removeIndex = this.pool.map((item)=>item.driver).indexOf(locationData.driver);
          this.pool.splice(removeIndex, 1);

          /* Verifica si el conductor del marcador seleccionado dejó de enviar su ubicación 
          para dejar de obtener la distancia entre el pasajero y el conductor.*/
          if(this.markerInfo.driver == locationData.driver)
            this.markerInfo = {};
        }
  
      });
    }

  }
}
