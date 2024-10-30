import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoordonneeComponent } from './coordonnee.component';
import { CoordonneeDetailsComponent } from './details/coordonnee-details.component';
import { CoordonneeDetailsHomeComponent } from './details/home/cood-home.component';
import { CoordonneeDetailsResolver } from './details/coordonnee-details.resolver';



const routes: Routes = [
  {
    path: '',
    component: CoordonneeComponent,
    data: {
      guards: [{
        scope: 'annuaire',
        access: 'LECTURE'
      }]
    },
  },
  {
    path:':id',
    component: CoordonneeDetailsComponent,
    data: {
      guards: [{
        scope: 'annuaire',
        access: 'LECTURE'
      }]
    },
    resolve: { coordonnee: CoordonneeDetailsResolver},
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: CoordonneeDetailsHomeComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [CoordonneeDetailsResolver]
})
export class CoordonneeRoutingModule {}
