import { PanneAffectationEditComponent } from './panne-affectation-edit/panne-affectation-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PanneComponent } from './panne.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';
import { PanneNiveauModule } from 'src/app/modules/logistique/panne-niveau/panne-niveau.module';
import { CommandeComponent } from './commande/commande.component';


@NgModule({
    declarations: [
        PanneComponent,
        EditComponent,
        PanneAffectationEditComponent,
        CommandeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        PanneNiveauModule,
        CustomInputModule
    ],
    exports: [
        PanneComponent,
        CommandeComponent
    ],
    entryComponents: [EditComponent,PanneAffectationEditComponent]
})
export class PanneModule {

}
