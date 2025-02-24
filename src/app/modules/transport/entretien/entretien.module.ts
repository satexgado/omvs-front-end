import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntretienComponent } from './entretien.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';


@NgModule({
    declarations: [
        EntretienComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CustomInputModule
    ],
    exports: [
        EntretienComponent,
    ],
    entryComponents: [EditComponent]
})
export class EntretienModule {

}
