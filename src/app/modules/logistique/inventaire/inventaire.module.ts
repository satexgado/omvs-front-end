import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InventaireComponent } from './inventaire.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';


@NgModule({
    declarations: [
        InventaireComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,

        InlineEditorModule
    ],
    exports: [
        InventaireComponent,
    ],
    entryComponents: [EditComponent]
})
export class InventaireModule {

}
