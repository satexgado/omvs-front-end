import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CarburantSortieComponent } from './carburant-sortie.component';
import { CarburantModule as TypeCarburantModule } from '../../transport/carburant/carburant.module';
import { TypeCoupureModule } from '../type-coupure/type-coupure.module';
import { TypeEngagementModule } from '../type-engagement/type-engagement.module';
import { AutomobileModule } from '../../transport/automobile/automobile.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';

@NgModule({
    declarations: [
        CarburantSortieComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        AutomobileModule,
        TypeEngagementModule,
        TypeCarburantModule,
        TypeCoupureModule,
        CustomInputModule,
    ],
    exports: [
        CarburantSortieComponent,
    ],
    entryComponents: [EditComponent]
})
export class CarburantSortieModule {

}
