import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendrierTransportComponent } from './calendrier.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { CalendrierModule } from '../../calendrier/calendrier.module';

@NgModule({
    declarations: [
        CalendrierTransportComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        CalendrierModule
    ],
    exports: [
        CalendrierTransportComponent,
    ],
    entryComponents: []
})
export class CalendrierTransportModule {

}
