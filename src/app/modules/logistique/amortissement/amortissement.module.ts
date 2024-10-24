import { AmortissementAffectationEditComponent } from './amortissement-affectation-edit/amortissement-affectation-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AmortissementComponent } from './amortissement.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';


@NgModule({
    declarations: [
        AmortissementComponent,
        EditComponent,
        AmortissementAffectationEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CustomInputModule
    ],
    exports: [
        AmortissementComponent,
    ],
    entryComponents: [EditComponent,AmortissementAffectationEditComponent]
})
export class AmortissementModule {

}
