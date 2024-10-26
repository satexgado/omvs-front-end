import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarburantComponent } from './carburant.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';

@NgModule({
    declarations: [
        CarburantComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        CarburantComponent,
    ],
    entryComponents: [EditComponent]
})
export class CarburantModule {

}
