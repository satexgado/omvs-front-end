import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CarteAbonnementCarburantComponent } from './carte-abonnement.component';
import { CustomInputModule } from 'src/app/shared/components/custom-input';

@NgModule({
    declarations: [
        CarteAbonnementCarburantComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CustomInputModule
    ],
    exports: [
        CarteAbonnementCarburantComponent,
    ],
    entryComponents: [EditComponent]
})
export class CarteAbonnementCarburantModule {

}
