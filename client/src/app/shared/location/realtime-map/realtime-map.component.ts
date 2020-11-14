import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DriverService } from 'src/app/services/driver/driver.service';
import { LocationService } from 'src/app/services/location/location.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-realtime-map',
  templateUrl: './realtime-map.component.html',
  styleUrls: ['./realtime-map.component.css']
})
export class RealtimeMapComponent implements OnInit {

  @Input() location:any = {};
  
  //Variable que almacena la ubicación de los conductores de una ruta dada.
  pool:Array<any> = []; 

  private selectedDriver = null;

  //Drawer
  drawerVisible:boolean = false;
  placement: NzDrawerPlacement = 'bottom';

  //Locaclización del pasajero
  passengerLatitude = 0;
  passengerLongitude = 0;

  //Variable que almacena la distancia(en tiempo) entre un conductor y un pasajero.
  distance:string = ''; 

  //Almacena los datos del conductor, dependiendo del marcador seleccionado.
  markerInfo:any = {}; 

  //Marcador de autobus
  passengerIcon = { url: '../../assets/icons/blue-map-marker.png', scaledSize: {height: 40, width: 25}}
  busIcon = { url: '../../assets/icons/autobus.png', scaledSize: {height: 40, width: 40}}

  constructor(private locationService:LocationService,private activatedRoute:ActivatedRoute,private loginService:LoginService,
    private driverService:DriverService) { }

  ngOnInit(): void {

    //Si el usuario logueado es invitado se obtiene la localización actual.
    if(this.loginService.userLogged() == null) this.passengerCurrentLocation();
    
    this.driverService.getLocation().subscribe((busLocation:any)=>{
      if(busLocation != null) this.addLocationToPool(busLocation);              
    });
    
    //Cada 5 minutos se eliminan del pool los conductores que no están enviando su ubicación.
    setInterval(()=>{
      this.eliminateInactiveDrivers(this.pool);
    },3000);

  }

  private addLocationToPool(busLocation:any){
    //Verificamos la ruta de la cual se quiere obtener información.
    this.activatedRoute.params.subscribe((param)=>{
      if(param.internalId == busLocation.route){

        let driverExists = this.pool.some((location)=>location.driver == busLocation.driver);
        if(driverExists){
          //Si el conductor ya existe en el pool entonces se remueve para volver a introducir la información de su localización.
          //Se obtiene el indice del objeto de la localización dentro del pool.
          var removeIndex = this.pool.map(function(item) { return item.driver; }).indexOf(busLocation.driver); 

          //Antes de eliminarlo se consigue su la última localización de este conductor. 
          let lastLocation = this.getLastDriverLocation(removeIndex);
          busLocation.lastLatitude = lastLocation.latitude;
          busLocation.lastLongitude = lastLocation.longitude;

          //Elimina el objeto.
          this.pool.splice(removeIndex, 1);
        }else{
          busLocation.lastLatitude = null;
          busLocation.lastLongitude = null;
        }
        this.pool.push(busLocation);
      }  
    });
  }

  markerClick(driverId){

    if(driverId != this.selectedDriver) this.distance = '';
    
    this.selectedDriver = driverId;   
    this.drawerVisible = true;         
      
    //Se consigue la información de acuerdo al autobus cliqueado en el mapa
    this.markerInfo = this.pool.filter((element)=>this.selectedDriver == element.driver)[0];

    //Se determina si hay un conductor seleccionado.
    if(this.markerInfo != null) {
      if(this.markerInfo.latitude != this.markerInfo.lastLatitude && this.markerInfo.longitude != this.markerInfo.lastLongitude)
        this.getDistance(this.markerInfo);
    }
  }

  getDistance(markerInfo){    
    this.locationService.getCurrentLocation((location)=>{

      //La localización del conductor.
      let origins = markerInfo.latitude+','+markerInfo.longitude;
      //La localización actual del pasajero.
      let destinations = location.coords.latitude + ',' + location.coords.longitude;

      this.locationService.distance(origins,destinations).subscribe((res)=>{
        this.distance = res.message;
      });

    },()=>console.error('Ha ocurrido un inconveniente al intentar obtener el tiempo de llegada.'));
    
  }

  drawerClose(): void {
    this.drawerVisible = false;
  }

  passengerCurrentLocation(){
    this.locationService.getCurrentLocation((location)=>{
      this.passengerLatitude = location.coords.latitude;
      this.passengerLongitude = location.coords.longitude;
    },()=>{alert('Active su ubicación para determinar el tiempo de llegada del transporte.'); console.error('Ha ocurrido un error al intentar obtener la localización actual del pasajero.');});
  }

  private eliminateInactiveDrivers(pool:Array<any>){
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

  private getLastDriverLocation(index){
    let driverLocation = this.pool[index];
    return {latitude:driverLocation.latitude, longitude:driverLocation.longitude};
  }
}
