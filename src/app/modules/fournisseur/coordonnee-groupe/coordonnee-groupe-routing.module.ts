import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordonneeGroupeComponent } from './coordonnee-groupe.component';
import { CoordonneeGroupeResolver } from './coordonnee-groupe-ui.resolver';


const routes: Routes = [
  {
    path: '',
    component: CoordonneeGroupeComponent,
    data: {
      guards: [{
        scope: 'annuaire',
        access: 'LECTURE'
      }]
    },
    children: [
      {
        path: ':id',
        resolve: { coordonneeGrp: CoordonneeGroupeResolver}
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [CoordonneeGroupeResolver]
})
export class CoordonneeGroupeRoutingModule {}
