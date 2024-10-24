import { LogistiqueSharedModule } from './logistique-shared/logistique-shared.module';
import { DefectModule } from './defect/defect.module';
import { InventaireModule } from './inventaire/inventaire.module';
import { AmortissementModule } from './amortissement/amortissement.module';
import { CommandeAffectationEditComponent } from './commande-affectation-edit/commande-affectation-edit.component';
import { PanneModule } from './panne/panne.module';
import { CommandeEditComponent } from './commande-edit/commande-edit.component';
import { CommandeComponent } from './commande/commande.component';
import { FournisseurModule } from './fournisseur/fournisseur.module';
import { LogistiqueRoutingModule } from './logistique-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogistiqueTopbarComponent } from './topbar/topbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogistiqueTemplateComponent } from './template/template.component';
import { MaterielComponent } from './materiel/materiel.component';
import { SuivieComponent} from './suivie/suivie.component';
import { BesoinModule} from './besoin/besoin.module';

@NgModule({
  declarations: [
    LogistiqueTopbarComponent,
    LogistiqueTemplateComponent,
    MaterielComponent,
    SuivieComponent,
    CommandeComponent,
    CommandeEditComponent,
    CommandeAffectationEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LogistiqueRoutingModule,
    BesoinModule,
    FournisseurModule,
    InventaireModule,
    PanneModule,
    DefectModule,
    LogistiqueSharedModule,
    AmortissementModule
  ],
  exports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    CommandeEditComponent,
    CommandeAffectationEditComponent
  ],
})
export class LogistiqueModule {

}
