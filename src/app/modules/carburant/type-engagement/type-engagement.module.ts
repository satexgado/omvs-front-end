import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { TypeEngagementComponent } from './type-engagement.component';

@NgModule({
    declarations: [
        TypeEngagementComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        TypeEngagementComponent,
    ],
    entryComponents: [EditComponent]
})
export class TypeEngagementModule {

}
