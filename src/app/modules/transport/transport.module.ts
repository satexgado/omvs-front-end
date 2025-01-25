import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared/shared.module';
import { DropdownSelectModule } from '../dropdown-select/dropdown-select.module';
import { TransportRoutingModule } from './transport-routing.module';
import { TransportSidebarComponent } from './sidebar/sidebar.component';
import { TemplateComponent } from './template/template.component';
import { AutomobileModule } from './automobile/automobile.module';
import { DocumentPermiModule } from './document-permi/document-permi.module';
import { DossierMedicalModule } from './dossier-medical/dossier-medical.module';
import { ItineraireModule } from './itineraire/itineraire.module';
import { DossierConducteurModule } from './dossier-conducteur/dossier-conducteur.module';
import { CouleurModule } from './couleur/couleur.module';
import { GenreModule } from './genre/genre.module';
import { MarqueModule } from './marque/marque.module';
import { ModeleModule } from './modele/modele.module';
import { SerieModule } from './serie/serie.module';
import { LieuModule } from './lieu/lieu.module';
import { MasqueItineraireModule } from './masque-itineraire/masque-itineraire.module';
import { AssuranceModule } from './assurance/assurance.module';
import { CalendrierTransportComponent } from './calendrier/calendrier.component';
import { CalendrierModule } from '../calendrier/calendrier.module';
import { CalendrierTransportModule } from './calendrier/calendrier.module';
import { VisiteTechniqueModule } from './visite-technique/visite-technique.module';
import { CarteRapidoModule } from './carte-rapido/carte-rapido.module';
;

@NgModule({
  declarations: [
    TransportSidebarComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    TransportRoutingModule,
    SharedModule,
    DropdownSelectModule,
    AutomobileModule,
    DocumentPermiModule,
    DossierMedicalModule,
    DossierConducteurModule,
    MasqueItineraireModule,
    ItineraireModule,
    CouleurModule,
    GenreModule,
    MarqueModule,
    ModeleModule,
    LieuModule,
    SerieModule,
    AssuranceModule,
    CalendrierTransportModule,
    VisiteTechniqueModule,
    CarteRapidoModule
  ],
  exports: [
  ],
  providers: []
})
export class TransportModule {

}
