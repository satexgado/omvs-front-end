import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItineraireComponent } from './itineraire.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { SerieModule } from '../serie/serie.module';
import { MarqueModule } from '../marque/marque.module';
import { ModeleModule } from '../modele/modele.module';
import { GenreModule } from '../genre/genre.module';
import { CouleurModule } from '../couleur/couleur.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';
import { LieuModule } from '../lieu/lieu.module';
import { MasqueItineraireModule } from '../masque-itineraire/masque-itineraire.module';

@NgModule({
    declarations: [
        ItineraireComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        InlineEditorModule,
        LieuModule,
        CustomInputModule,
        MasqueItineraireModule
    ],
    exports: [
        ItineraireComponent
    ],
    entryComponents: [EditComponent]
})
export class ItineraireModule {

}
