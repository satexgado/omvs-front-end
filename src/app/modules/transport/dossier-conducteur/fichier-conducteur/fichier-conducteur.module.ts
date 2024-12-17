import { FichierConducteurComponent } from './fichier-conducteur.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { UploadModule } from 'src/app/upload';

@NgModule({
  declarations: [
    FichierConducteurComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UploadModule,
  ],
  entryComponents: [EditComponent],
  exports: [
    FichierConducteurComponent,
  ],
})
export class FichierConducteurModule {

}
