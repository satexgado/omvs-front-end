import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenreComponent } from './genre.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';

@NgModule({
    declarations: [
        GenreComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule
    ],
    exports: [
        GenreComponent,
    ],
    entryComponents: [EditComponent]
})
export class GenreModule {

}
