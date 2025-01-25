import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CarteRapidoComponent } from './carte-rapido.component';
import { CustomInputModule } from 'src/app/shared/components/custom-input';

@NgModule({
    declarations: [
        CarteRapidoComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CustomInputModule
    ],
    exports: [
        CarteRapidoComponent,
    ],
    entryComponents: [EditComponent]
})
export class CarteRapidoModule {

}
