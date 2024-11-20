import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssurancePaiementComponent } from './assurance-paiement.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';


@NgModule({
    declarations: [
        AssurancePaiementComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CustomInputModule
    ],
    exports: [
        AssurancePaiementComponent,
    ],
    entryComponents: [EditComponent]
})
export class AssurancePaiementModule {

}
