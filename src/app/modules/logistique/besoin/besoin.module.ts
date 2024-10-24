import { BesoinAffectationEditComponent } from './besoin-affectation-edit/besoin-affectation-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BesoinComponent } from './besoin.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { LogistiqueSharedModule } from '../logistique-shared/logistique-shared.module';


@NgModule({
    declarations: [
        BesoinComponent,
        EditComponent,
        BesoinAffectationEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        LogistiqueSharedModule
    ],
    exports: [
        BesoinComponent,
    ],
    entryComponents: [EditComponent,BesoinAffectationEditComponent]
})
export class BesoinModule {

}
