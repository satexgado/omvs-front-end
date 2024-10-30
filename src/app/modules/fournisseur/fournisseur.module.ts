import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../../shared/shared.module';
import { DropdownSelectModule } from '../dropdown-select/dropdown-select.module';
import { FournisseurComponent } from './fournisseur.component';
import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { CoordonneeTypeModule } from './coordonnee-type/coordonnee-type.module';


@NgModule({
  declarations: [
    FournisseurComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FournisseurRoutingModule,
    SharedModule,
    DropdownSelectModule,
    CoordonneeTypeModule
  ],
  exports: [
  ],
  providers: []
})
export class FournisseurModule {

}
