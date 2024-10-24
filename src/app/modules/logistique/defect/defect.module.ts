import { DefectAffectationEditComponent } from './defect-affectation-edit/defect-affectation-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DefectComponent } from './defect.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';


@NgModule({
    declarations: [
        DefectComponent,
        EditComponent,
        DefectAffectationEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        DefectComponent,
    ],
    entryComponents: [EditComponent,DefectAffectationEditComponent]
})
export class DefectModule {

}
