import { PanneAffectationEditComponent } from './panne-affectation-edit/panne-affectation-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PanneComponent } from './panne.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';


@NgModule({
    declarations: [
        PanneComponent,
        EditComponent,
        PanneAffectationEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        PanneComponent,
    ],
    entryComponents: [EditComponent,PanneAffectationEditComponent]
})
export class PanneModule {

}
