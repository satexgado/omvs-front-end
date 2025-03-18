import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutomobileComponent } from './automobile.component';
import { EditComponent } from './edit/edit.component';
import { InlineEditorModule } from 'src/app/inline-editor/inline-editor.module';
import { SerieModule } from '../serie/serie.module';
import { MarqueModule } from '../marque/marque.module';
import { ModeleModule } from '../modele/modele.module';
import { GenreModule } from '../genre/genre.module';
import { CouleurModule } from '../couleur/couleur.module';
import { CustomInputModule } from 'src/app/shared/components/custom-input';
import { AutomobileItineraireModule } from '../automobile-itineraire/automobile-itineraire.module';
import { AutomobileDetailsEditComponent } from './details/edit/automobile-details-edit.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CarburantModule } from '../carburant/carburant.module';
import { AutomobileTypeModule } from '../automobile-type/automobile-type.module';
import { ConfigurationTransportComponent } from './configuration/configuration.component';
import { MasqueItineraireModule } from '../masque-itineraire/masque-itineraire.module';
import { LieuModule } from '../lieu/lieu.module';
import { PanneModule } from './panne/panne.module';
import { CalendrierModule } from '../../calendrier/calendrier.module';
import { UploadModule } from 'src/app/upload';
import { EtatModule } from '../etat/etat.module';
import { VisiteTechniqueModule } from '../visite-technique/visite-technique.module';
import { AssuranceModule } from '../assurance/assurance.module';
import { MapsPluginModule } from 'src/app/components/maps/maps-plugin.module';
import { DossierConducteurModule } from '../dossier-conducteur/dossier-conducteur.module';
import { EntretienModule } from '../entretien/entretien.module';
import { EntretienTypeModule } from '../entretien-type/entretien-type.module';
import { KilometrageModule } from '../kilometrage/kilometrage.module';
import { PermiTypeModule } from '../permi-type/permi-type.module';
import { PanneNiveauModule } from '../../logistique/panne-niveau/panne-niveau.module';

@NgModule({
    declarations: [
        AutomobileComponent,
        AutomobileDetailsEditComponent,
        ConfigurationTransportComponent,
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
        CarburantModule,
        AutomobileTypeModule,
        CustomInputModule,
        AutomobileItineraireModule,
        MasqueItineraireModule,
        InfiniteScrollModule,
        LieuModule,
        PanneModule,
        CalendrierModule,
        UploadModule,
        EtatModule,
        VisiteTechniqueModule,
        AssuranceModule,
        DossierConducteurModule,
        MapsPluginModule,
        EntretienModule,
        EntretienTypeModule,
        KilometrageModule,
        PermiTypeModule,
        PanneNiveauModule,
    ],
    exports: [
        AutomobileComponent,
        ConfigurationTransportComponent
    ],
    entryComponents: [EditComponent]
})
export class AutomobileModule {

}
