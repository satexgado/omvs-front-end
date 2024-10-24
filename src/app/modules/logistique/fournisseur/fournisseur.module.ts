import { FournisseurSidebarComponent } from './fournisseur-sidebar/fournisseur-sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FournisseurComponent } from './fournisseur.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';


@NgModule({
    declarations: [
        FournisseurComponent,
        FournisseurSidebarComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,

        InlineEditorModule
    ],
    exports: [
        FournisseurComponent,
    ],
    entryComponents: [EditComponent]
})
export class FournisseurModule {

}
