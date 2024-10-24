import { MaterielSidebarComponent } from './materiel-sidebar/materiel-sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MaterielSidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    CommonModule,
    SharedModule,
    MaterielSidebarComponent
  ],
  entryComponents: []
})
export class LogistiqueSharedModule {

}
