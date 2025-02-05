import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { Routes, RouterModule} from '@angular/router';
//COMPONENTS
import { VilleComponent } from './ville/ville.component';
import { PaysComponent } from './pays/pays.component';
import { PluginModule } from 'src/app/plugin/plugin.module';
import { MapsPluginModule } from './maps-plugin.module';
import { EmplacementComponent } from './emplacement/emplacement.component';

const appRoute: Routes = [
  { path: '', redirectTo: 'pays'},
  { path: 'emplacement', component: EmplacementComponent },
  { path: 'emplacement/page/:page', component: EmplacementComponent },
  { path: 'pays', component: PaysComponent },
  { path: 'pays/page/:page', component: PaysComponent },
  { path: 'ville', component: VilleComponent },
  { path: 'ville/page/:page', component: VilleComponent}
];

@NgModule({
  declarations: [EmplacementComponent, VilleComponent, PaysComponent],
  imports: [
    SharedModule,
    PluginModule,
    MapsPluginModule,
    RouterModule.forChild(appRoute)
  ]
})

export class MapsModule { }
