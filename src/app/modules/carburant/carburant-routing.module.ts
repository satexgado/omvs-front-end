import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CarburantComponent } from './carburant.component';
import { CarburantEntreeComponent } from './carburant-entree/carburant-entree.component';
import { CarburantSortieComponent } from './carburant-sortie/carburant-sortie.component';
import { ApprovisionnementComponent } from './approvisionnement/approvisionnement.component';
import { TypeCoupureComponent } from './type-coupure/type-coupure.component';
import { TypeEngagementComponent } from './type-engagement/type-engagement.component';
import { AnalyseBonCarburantComponent } from './analyse/analyse.component';
import { CarteAbonnementCarburantComponent } from './carte-abonnement/carte-abonnement.component';
import { BonCarburantComponent } from './bon-carburant/bon-carburant.component';
import { BonCarburantMasqueComponent } from './bon-carburant-masque/bon-carburant-masque.component';

const butsRoutes: Routes = [
  {
    path:'', component:CarburantComponent,
    children:[
      {
        path:'', pathMatch:'full', redirectTo:'entrant'
      },
      {
        path: 'masque',
        data: {
          icon: 'fa-receipt', title:'Masque Bon de carburant'
        },
        component:BonCarburantMasqueComponent
      },
      {
        path: 'stock',
        data: {
          icon: 'fa-warehouse', title:'Stock Bon de carburant'
        },
        component:BonCarburantComponent
      },
      {
        path: 'entrant',
        data: {
          icon: 'fa-gift-card', title:'Entrée Bon de carburant'
        },
        component:CarburantEntreeComponent
      },
      {
        path: 'sortant',
        data: {
          icon: 'fa-hand-holding-box', title:'Sortie en bon de carburant'
        },
        component:CarburantSortieComponent
      },
      {
        path: 'carte-abonnement',
        data: {
          icon: 'fa-credit-card-front', title:'Carte abonnement'
        },
        component:CarteAbonnementCarburantComponent
      },
      {
        path: 'approvisionnement',
        data: {
          icon: 'fa-gas-pump', title:'Approvisionnement en bon de carburant'
        },
        component:ApprovisionnementComponent
      },
      {
        path: 'type-coupure',
        data: {
          icon: 'fa-cabinet-filing', title:'Type Coupure bon de carburant'
        },
        component:TypeCoupureComponent
      },
      {
        path: 'type-engagement',
        data: {
          icon: 'fa-ramp-loading', title:'Type Engagement bon de carburant'
        },
        component:TypeEngagementComponent
      },
      {
        path: 'analyse',
        data: {
          icon: 'fa-user-chart', title:'Analyse bon de carburant'
        },
        component:AnalyseBonCarburantComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(butsRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class CarburantRoutingModule {}
