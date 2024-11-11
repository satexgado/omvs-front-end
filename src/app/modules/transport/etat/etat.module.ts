import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EtatComponent } from './etat.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';

@NgModule({
    declarations: [
        EtatComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        EtatComponent,
    ],
    entryComponents: [EditComponent]
})
export class EtatModule {

}
