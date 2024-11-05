import { CoordonneeGroupeActionComponent } from './coordonnee-action.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoordonneeGroupeComponent } from './coordonnee-groupe.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoordonneeGroupeRoutingModule } from './coordonnee-groupe-routing.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AffectationCoordonneeGroupeEditComponent } from './affectation/affectation.component';
import { CoordonneeGroupeHierarchieEditComponent } from './coordonnee-groupe-hierarchie-edit/coordonnee-groupe-hierarchie-edit.component'
import { CoordonneeGroupeSelectComponent } from './groupe-select/groupe-select.component';
import { ChooseItemModule } from '../../choose-item';

@NgModule({
    declarations: [
        CoordonneeGroupeComponent,
        AffectationCoordonneeGroupeEditComponent,
        CoordonneeGroupeActionComponent,
        CoordonneeGroupeHierarchieEditComponent,
        EditComponent,
        CoordonneeGroupeSelectComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoordonneeGroupeRoutingModule,
        InlineEditorModule,
        InfiniteScrollModule,
        AngularMultiSelectModule,
        ChooseItemModule
    ],
    exports: [
        CoordonneeGroupeSelectComponent
    ],
    entryComponents: [EditComponent, AffectationCoordonneeGroupeEditComponent, CoordonneeGroupeActionComponent, CoordonneeGroupeSelectComponent],
})
export class CoordonneeGroupeModule {

}
