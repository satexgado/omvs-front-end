import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseEditComponent } from './edit/base-edit.component';
import { EditableListComponent } from './editable-list/editable.list.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
      EditableListComponent,
      BaseEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        NgbModalModule
    ],
    exports: [
      EditableListComponent,     
      BaseEditComponent
    ]
})
export class CustomComponentModule {

}