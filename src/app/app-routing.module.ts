import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountGuard } from './services/account/accountGuard.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'localisation',
    canActivate: [AccountGuard], data: { action: 'logged' },
    loadChildren: './components/maps/maps.module#MapsModule'
  },
  {
    path: 'materiel',
    canActivate: [AccountGuard], data: { action: 'logged' },
    loadChildren: './components/materiel/materiel.module#MaterielModule'
  },
  {
    path: 'rh',
    canActivate: [AccountGuard], data: { action: 'logged' },
    loadChildren: './components/rh/rh.module#RhModule'
  },
  {
    path: 'mission',
    canActivate: [AccountGuard], data: { action: 'logged' },
    loadChildren: './components/mission/mission.module#MissionModule'
  },
  {
    path: 'account',
    loadChildren: './components/account/account.module#AccountModule'
  },
  {
    path: 'dashboard',
    canActivate: [AccountGuard], data: { action: 'logged' },
    loadChildren: './components/modules/tableau/tableau-bord.module#TableauBordModule'
  },
  {
    path: 'configuration',
    canActivate: [AccountGuard], data: { action: 'logged' },
    loadChildren: './components/setting/setting.module#SettingModule'
  },
  {path: 'transport',
    data: {
      breadcrumb: 'transport',
      action: 'logged' 
    },
    canActivate: [AccountGuard], 
    loadChildren: './modules/transport/transport.module#TransportModule'
  },
  {path: 'annuaire',
    data: {
      breadcrumb: 'annuaire',
      action: 'logged' 
    },
    canActivate: [AccountGuard], 
    loadChildren: './modules/fournisseur/fournisseur.module#FournisseurModule'
  },
  {path: 'logistique',
    data: {
      breadcrumb: 'logistique',
      action: 'logged' 
    },
    canActivate: [AccountGuard], 
    loadChildren: './modules/logistique/logistique.module#LogistiqueModule'
  },
  // {
  //   path: 'user',
  //   loadChildren: './components/user/user.module#UserModule'
  // },

  {
    path: '**',
    loadChildren: './components/not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
