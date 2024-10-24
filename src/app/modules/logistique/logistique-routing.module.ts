import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogistiqueTemplateComponent } from './template/template.component';
import { MaterielComponent } from './materiel/materiel.component'
import { BesoinComponent } from './besoin/besoin.component';
import { SuivieComponent } from './suivie/suivie.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { AmortissementComponent } from './amortissement/amortissement.component';


const butsRoutes: Routes = [
  { path: '', component: LogistiqueTemplateComponent,
  children: [
    {path: '', pathMatch: 'Full', redirectTo: 'materiel'},
    {
      path: 'materiel',
      data: {
        breadcrumb: 'Materiel'
      },
      component: MaterielComponent
    },
    {
      path: 'suivie',
      data: {
        breadcrumb: 'Suivie'
      },
      component: SuivieComponent
    },
    {
      path: 'besoin',
      data: {
        breadcrumb: 'Besoin'
      },
      component: BesoinComponent
    },
    {
      path: 'fournisseur',
      data: {
        breadcrumb: 'Fournisseur'
      },
      component: FournisseurComponent
    },
    {
      path: 'inventaire',
      data: {
        breadcrumb: 'Inventaire'
      },
      component: InventaireComponent
    },
    {
      path: 'amortissement',
      data: {
        breadcrumb: 'Amortissement'
      },
      component: AmortissementComponent
    }
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(butsRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class LogistiqueRoutingModule {}
