import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { Routes, RouterModule } from '@angular/router';
//COMPONENTS
import { RhIndexComponent } from './rh-index/rh-index.component';
import { DepartementComponent } from './departement/departement.component';
import { PosteComponent } from './poste/poste.component';
import { PluginModule } from 'src/app/plugin/plugin.module';
import { RhPluginModule } from './rh-plugin.module';

const appRoute: Routes = [
  { path: '', component: RhIndexComponent },
  { path: 'personnel', component: RhIndexComponent },
  { path: 'personnel/page/:page', component: RhIndexComponent },
  { path: 'poste', component: PosteComponent },
  { path: 'poste/page/:page', component: PosteComponent },
  { path: 'departement', component: DepartementComponent },
  { path: 'departement/page/:page', component: DepartementComponent },
];

@NgModule({
  declarations: [RhIndexComponent, DepartementComponent, PosteComponent],
  imports: [
    SharedModule,
    RhPluginModule,
    PluginModule,
    RouterModule.forChild(appRoute)
  ]
})

export class RhModule { }


