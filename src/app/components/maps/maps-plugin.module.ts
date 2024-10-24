import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { AddPaysComponent } from './add-pays/add-pays.component';
import { AddVilleComponent } from './add-ville/add-ville.component';
//COMPONENTS



@NgModule({
  declarations: [AddPaysComponent, AddVilleComponent],
  imports: [
    SharedModule
  ],
  exports: [AddPaysComponent, AddVilleComponent]
})

export class MapsPluginModule { }


