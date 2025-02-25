import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DossierMedicalComponent } from './dossier-medical.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { SerieModule } from '../serie/serie.module';
import { MarqueModule } from '../marque/marque.module';
import { ModeleModule } from '../modele/modele.module';
import { GenreModule } from '../genre/genre.module';
import { CouleurModule } from '../couleur/couleur.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';

@NgModule({
    declarations: [
        DossierMedicalComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        SerieModule,
        MarqueModule,
        ModeleModule,
        GenreModule,
        CouleurModule,
        CustomInputModule,


    ],
    exports: [
        DossierMedicalComponent
    ],
    entryComponents: [EditComponent]
})
export class DossierMedicalModule {

}
