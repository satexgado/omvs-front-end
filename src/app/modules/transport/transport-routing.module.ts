import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { AutomobileComponent } from './automobile/automobile.component';
import { NgModule } from '@angular/core';
import { DocumentPermiComponent } from './document-permi/document-permi.component';
import { DossierMedicalComponent } from './dossier-medical/dossier-medical.component';
import { ItineraireComponent } from './itineraire/itineraire.component';
import { AutomobileDetailsEditComponent } from './automobile/details/edit/automobile-details-edit.component';
import { AutomobileDetailsEditResolver } from './automobile/details/edit/automobile-details-edit.revolver';
import { DossierConducteurComponent } from './dossier-conducteur/dossier-conducteur.component';
import { DossierConducteurDetailsEditComponent } from './dossier-conducteur/details/edit/dossier-conducteur-details-edit.component';
import { DossierConducteurDetailsEditResolver } from './dossier-conducteur/details/edit/dossier-conducteur-details-edit.revolver';
import { CouleurComponent } from './couleur/couleur.component';
import { GenreComponent } from './genre/genre.component';
import { MarqueComponent } from './marque/marque.component';
import { ModeleComponent } from './modele/modele.component';
import { SerieComponent } from './serie/serie.component';
import { LieuComponent } from './lieu/lieu.component';
import { MasqueItineraireComponent } from './masque-itineraire/masque-itineraire.component';

const butsRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'mes-autos'},
  { path: 'mes-autos',
  data: {
    breadcrumb: 'Mes Autos'
  },
  children: [
    {path: '', component: TemplateComponent, pathMatch:'full',children: [
      {path: '', component: AutomobileComponent}
    ]},
    {path: ':idauto', component: AutomobileDetailsEditComponent,
      resolve: { automobile: AutomobileDetailsEditResolver}
    }
  ]},
  { path: 'mes-conducteurs',
  data: {
    breadcrumb: 'Mes conducteurs'
  },
  children: [
    {path: '', component: TemplateComponent, pathMatch:'full',children: [
      {path: '', component: DossierConducteurComponent}
    ]},
    {path: ':iddossier', component: DossierConducteurDetailsEditComponent,
      resolve: { dossierconducteur: DossierConducteurDetailsEditResolver}
    }
  ]},
  { path: 'mes-documents',
  data: {
    breadcrumb: 'Mes documents'
  },
  children: [
    {path: '', component: TemplateComponent, pathMatch:'full',children: [
      {path: '', component: DocumentPermiComponent}
    ]},
  ]},
  { path: 'mes-dossiers',
  data: {
    breadcrumb: 'Mes dossiers'
  },
  children: [
    {path: '', component: TemplateComponent, pathMatch:'full',children: [
      {path: '', component: DossierMedicalComponent}
    ]},
  ]},
  { path: 'mes-itineraires',
  data: {
    breadcrumb: 'Mes itineraires'
  },
  children: [
    {path: '', component: TemplateComponent, pathMatch:'full',children: [
      {path: '', component: ItineraireComponent}
    ]},
  ]},
  { path: 'configuration',
  data: {
    breadcrumb: 'Configuration'
  },
   component: TemplateComponent,children: [
    {path: '', pathMatch:'full', redirectTo: 'couleurs'},
    {path: 'lieux', component: LieuComponent},
    {path: 'couleurs', component: CouleurComponent},
    {path: 'genres', component: GenreComponent},
    {path: 'marques', component: MarqueComponent},
    {path: 'modeles', component: ModeleComponent},
    {path: 'series', component: SerieComponent},
    {path: 'masques-itineraires', component: MasqueItineraireComponent},
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(butsRoutes)
  ],
  exports: [RouterModule],
  providers: [AutomobileDetailsEditResolver,DossierConducteurDetailsEditResolver]
})
export class TransportRoutingModule {}
