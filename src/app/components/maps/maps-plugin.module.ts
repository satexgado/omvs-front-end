import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { AddPaysComponent } from './add-pays/add-pays.component';
import { AddVilleComponent } from './add-ville/add-ville.component';
import { AddEmplacementComponent } from './add-emplacement/add-emplacement.component';
//COMPONENTS



@NgModule({
  declarations: [AddEmplacementComponent,AddPaysComponent, AddVilleComponent],
  imports: [
    SharedModule
  ],
  exports: [AddEmplacementComponent, AddPaysComponent, AddVilleComponent]
})

export class MapsPluginModule { }


