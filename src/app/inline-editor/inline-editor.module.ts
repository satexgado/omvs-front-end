import { NgModule } from '@angular/core';
import { InlineEditorComponent } from './inline-editor.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AutofocusDirective } from '../shared/directives';

@NgModule({
    declarations: [InlineEditorComponent, AutofocusDirective],
    imports: [
        CommonModule,
        SharedModule
    ],
    exports: [
        InlineEditorComponent
    ],
    providers: []
})
export class InlineEditorModule {

}