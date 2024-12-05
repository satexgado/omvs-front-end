import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { TypeCoupureComponent } from './type-coupure.component';

@NgModule({
    declarations: [
        TypeCoupureComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        TypeCoupureComponent,
    ],
    entryComponents: [EditComponent]
})
export class TypeCoupureModule {

}
