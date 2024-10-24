import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
//COMPONENTS
import { AddPosteComponent } from './add-poste/add-poste.component';
import { AddDepartementComponent } from './add-departement/add-departement.component';
import { AddPersonnelComponent } from './add-personnel/add-personnel.component';
import { PersonnelDetailsComponent } from './personnel-details/personnel-details.component';


@NgModule({
  declarations: [AddPosteComponent, AddDepartementComponent, AddPersonnelComponent, PersonnelDetailsComponent],
  imports: [
    SharedModule, NgxPaginationModule,
  ],
  exports: [AddDepartementComponent, AddPosteComponent, AddPersonnelComponent, PersonnelDetailsComponent]
})

export class RhPluginModule { }


