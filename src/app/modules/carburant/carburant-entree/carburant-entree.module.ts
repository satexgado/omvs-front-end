import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CarburantEntreeComponent } from './carburant-entree.component';
import { CoordonneeModule } from '../../fournisseur/coordonnee/coordonnee.module';
import { ApprovisionnementModule } from '../approvisionnement/approvisionnement.module';
import { CarburantModule as TypeCarburantModule } from '../../transport/carburant/carburant.module';
import { TypeCoupureModule } from '../type-coupure/type-coupure.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';

@NgModule({
    declarations: [
        CarburantEntreeComponent,
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
        CarburantEntreeComponent,
    ],
    entryComponents: [EditComponent]
})
export class CarburantEntreeModule {

}
