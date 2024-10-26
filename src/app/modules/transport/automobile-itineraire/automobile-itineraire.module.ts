import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadModule } from 'src/app/upload';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { AutomobileItineraireComponent } from './automobile-itineraire.component';
import { ItineraireModule } from '../itineraire/itineraire.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';


@NgModule({
    declarations: [
        EditComponent,
        AutomobileItineraireComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        ItineraireModule,
        CustomInputModule,
        UploadModule
    ],
    exports: [
        AutomobileItineraireComponent
    ],
    providers: [],
    entryComponents: [EditComponent]
})
export class AutomobileItineraireModule {

}
