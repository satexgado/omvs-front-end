import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntretienTypeComponent } from './entretien-type.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';

@NgModule({
    declarations: [
        EntretienTypeComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        EntretienTypeComponent,
    ],
    entryComponents: [EditComponent]
})
export class EntretienTypeModule {

}
