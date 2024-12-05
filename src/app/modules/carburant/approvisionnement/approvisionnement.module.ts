import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { ApprovisionnementComponent } from './approvisionnement.component';

@NgModule({
    declarations: [
        ApprovisionnementComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        ApprovisionnementComponent,
    ],
    entryComponents: [EditComponent]
})
export class ApprovisionnementModule {

}
