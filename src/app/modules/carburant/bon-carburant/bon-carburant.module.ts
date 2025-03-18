import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { BonCarburantComponent } from './bon-carburant.component';
import { CoordonneeModule } from '../../fournisseur/coordonnee/coordonnee.module';
import { ApprovisionnementModule } from '../approvisionnement/approvisionnement.module';
import { CarburantModule as TypeCarburantModule } from '../../transport/carburant/carburant.module';
import { TypeCoupureModule } from '../type-coupure/type-coupure.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';

@NgModule({
    declarations: [
        BonCarburantComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CoordonneeModule,
        ApprovisionnementModule,
        CustomInputModule,
        TypeCarburantModule,
        TypeCoupureModule
    ],
    exports: [
        BonCarburantComponent,
    ],
    entryComponents: [EditComponent]
})
export class BonCarburantModule {

}
