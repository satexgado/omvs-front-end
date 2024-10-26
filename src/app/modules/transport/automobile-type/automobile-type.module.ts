import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutomobileTypeComponent } from './automobile-type.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';

@NgModule({
    declarations: [
        AutomobileTypeComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        AutomobileTypeComponent,
    ],
    entryComponents: [EditComponent]
})
export class AutomobileTypeModule {

}
