import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadModule } from 'src/app/upload';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';


@NgModule({
    declarations: [
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        UploadModule
    ],
    exports: [
    ],
    providers: [],
    entryComponents: [EditComponent]
})
export class AutomobileItineraireModule {

}
