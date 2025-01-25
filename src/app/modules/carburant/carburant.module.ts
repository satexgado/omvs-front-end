import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared/shared.module';
import { DropdownSelectModule } from '../dropdown-select/dropdown-select.module';
import { CarburantComponent } from './carburant.component';
import { CarburantRoutingModule } from './carburant-routing.module';
import { AnalyseBonCarburantEntrantModule } from './carburant-entree/analyse-entrant/analyse2.module';
import { AnalyseBonCarburantSortantModule } from './carburant-sortie/analyse-sortant/analyse2.module';
import { TypeEngagementModule } from './type-engagement/type-engagement.module';
import { TypeCoupureModule } from './type-coupure/type-coupure.module';
import { ApprovisionnementModule } from './approvisionnement/approvisionnement.module';
import { CarburantEntreeModule } from './carburant-entree/carburant-entree.module';
import { CarburantSortieModule } from './carburant-sortie/carburant-sortie.module';
import { AnalyseBonCarburantComponent } from './analyse/analyse.component';
import { CarteAbonnementCarburantModule } from './carte-abonnement/carte-abonnement.module';

@NgModule({
  declarations: [
    CarburantComponent,
    AnalyseBonCarburantComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    CarburantRoutingModule,
    SharedModule,
    DropdownSelectModule,
    AnalyseBonCarburantEntrantModule,
    AnalyseBonCarburantSortantModule,
    TypeEngagementModule,
    TypeCoupureModule,
    ApprovisionnementModule,
    CarburantEntreeModule,
    CarburantSortieModule,
    CarteAbonnementCarburantModule
  ],
  exports: [
  ],
  providers: []
})
export class CarburantModule {

}
