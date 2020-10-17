import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: 'location-sending', loadChildren: () => import('./modules/location-sending/location-sending.module').then(m => m.LocationSendingModule) }, 
{ path: 'location-receiving', loadChildren: () => import('./modules/location-receiving/location-receiving.module').then(m => m.LocationReceivingModule) }, 
{ path: 'home', loadChildren: () => import('./modules/home/home/home.module').then(m => m.HomeModule) },
{path:'', redirectTo:'home', pathMatch:'full'},
{ path: 'rutas', loadChildren: () => import('./modules/routes/routes/routes.module').then(m => m.RoutesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
