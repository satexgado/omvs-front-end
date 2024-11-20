import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssuranceComponent } from './assurance.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';
import { AssurancePaiementModule } from '../assurance-paiement/assurance-paiement.module';
import { CalendrierModule } from '../../calendrier/calendrier.module';
import { AssuranceSinistreModule } from '../assurance-sinistre/assurance-sinistre.module';


@NgModule({
    declarations: [
        AssuranceComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CustomInputModule,
        AssurancePaiementModule,
        AssuranceSinistreModule,
        CalendrierModule
    ],
    exports: [
        AssuranceComponent,
    ],
    entryComponents: [EditComponent]
})
export class AssuranceModule {

}
