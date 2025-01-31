import { MaterielSidebarComponent } from './materiel-sidebar/materiel-sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterielFormComponent } from './materiel-form/materiel-form.component';

@NgModule({
  declarations: [
    MaterielSidebarComponent,
    MaterielFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    SharedModule,
    MaterielSidebarComponent,
    MaterielFormComponent
  ],
  entryComponents: [MaterielFormComponent]
})
export class LogistiqueSharedModule {

}
