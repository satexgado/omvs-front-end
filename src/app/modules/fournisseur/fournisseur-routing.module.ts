import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoordonneeTypeComponent } from './coordonnee-type/coordonnee-type.component';
import { FournisseurComponent } from './fournisseur.component';

const butsRoutes: Routes = [
  {
    path:'', component:FournisseurComponent,
    children:[
      {
        path:'', pathMatch:'full', redirectTo:'liste'
      },
      {
        path: 'liste',
        data: {
          icon: 'fa-address-card', title:'Annuaire'
        },
        loadChildren: './coordonnee/coordonnee.module#CoordonneeModule'
      },
      {
        path: 'groupe',
        data: {
          icon: 'fa-book-user', title:'Groupe Contact'
        },
        loadChildren: './coordonnee-groupe/coordonnee-groupe.module#CoordonneeGroupeModule'
      },
      {
        path: 'type',
        data: {
          icon: 'fa-address-book', title:'Type Contact'
        },
        component:CoordonneeTypeComponent
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
export class FournisseurRoutingModule {}
