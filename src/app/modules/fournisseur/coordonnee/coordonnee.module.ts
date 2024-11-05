import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoordonneeComponent } from './coordonnee.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoordonneeDetailsComponent } from './details/coordonnee-details.component';
import { CoordonneeDetailsHomeComponent } from './details/home/cood-home.component';
import { CoordonneeRoutingModule } from './coordonnee-routing.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { CoordonneeActionComponent } from './coordonnee-action.component'
import { CustomInputModule } from 'src/app/shared/components/custom-input/custom-input.module';
import { CoordonneeGroupeModule } from '../coordonnee-groupe/coordonnee-groupe.module';
@NgModule({
    declarations: [
        CoordonneeComponent,
        CoordonneeDetailsComponent,
        CoordonneeDetailsHomeComponent,
        CoordonneeActionComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoordonneeRoutingModule,
        InlineEditorModule,
        InfiniteScrollModule,
        AngularMultiSelectModule,
        CustomInputModule,
        CoordonneeGroupeModule
    ],
    entryComponents: [EditComponent, CoordonneeActionComponent],
})
export class CoordonneeModule {

}
