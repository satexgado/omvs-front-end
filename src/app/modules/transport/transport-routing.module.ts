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
import { ConfigurationTransportComponent } from './automobile/configuration/configuration.component';
import { PanneComponent } from './automobile/panne/panne.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { CalendrierTransportComponent } from './calendrier/calendrier.component';
import { VisiteTechniqueComponent } from './visite-technique/visite-technique.component';

const butsRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'mes-autos'},
  { path: 'mes-autos',
  data: {
    breadcrumb: 'Mes Autos'
  },
  children: [
    {path: '', component: TemplateComponent,children: [
      {path: '', component: AutomobileComponent, data: {
        icon: 'fa-bus-school', title:'Vehicule'
      }, children: [
        {
          path: ':idauto',
          resolve: { courrier: AutomobileDetailsEditResolver}
        }
      ]}
    ]},
    // {path: ':idauto', component: AutomobileDetailsEditComponent,
    //   resolve: { automobile: AutomobileDetailsEditResolver}
    // }
  ]},
  { path: 'panne',
    data: {
      breadcrumb: 'Mes Pannes'
    },
    children: [
      {path: '', component: TemplateComponent,children: [
        {path: '', component: PanneComponent, data: {
          icon: 'fa-exclamation-circle', title:'Panne & Commande'
        }}
      ]},
      // {path: ':idauto', component: AutomobileDetailsEditComponent,
      //   resolve: { automobile: AutomobileDetailsEditResolver}
      // }
    ]},
    { path: 'calendrier',
      data: {
        breadcrumb: 'Calendrier'
      },
      children: [
        {path: '', component: TemplateComponent,children: [
          {path: '', component: CalendrierTransportComponent, data: {
            icon: 'fa-calendar', title:'Calendrier'
          }}
        ]},
        // {path: ':idauto', component: AutomobileDetailsEditComponent,
        //   resolve: { automobile: AutomobileDetailsEditResolver}
        // }
      ]},
    { path: 'assurance',
      data: {
        breadcrumb: 'Mes Assurances'
      },
      children: [
        {path: '', component: TemplateComponent,children: [
          {path: '', component: AssuranceComponent, data: {
            icon: 'fa-car-crash', title:'Assurance'
          }}
        ]},
        // {path: ':idauto', component: AutomobileDetailsEditComponent,
        //   resolve: { automobile: AutomobileDetailsEditResolver}
        // }
      ]},
      { path: 'visite-technique',
        data: {
          breadcrumb: 'Mes visites'
        },
        children: [
          {path: '', component: TemplateComponent,children: [
            {path: '', component: VisiteTechniqueComponent, data: {
              icon: 'fa-car-mechanic', title:'Visite Technique'
            }}
          ]},
          // {path: ':idauto', component: AutomobileDetailsEditComponent,
          //   resolve: { automobile: AutomobileDetailsEditResolver}
          // }
        ]},
  { path: 'mes-conducteurs',
  data: {
    breadcrumb: 'Mes conducteurs'
  },
  children: [
    {path: '', component: TemplateComponent,children: [
      {path: '', component: DossierConducteurComponent, data: {
        icon: 'fa-user-tie', title:'Conducteurs'
      },children: [
        {path: ':iddossier', component: DossierConducteurDetailsEditComponent,
          resolve: { dossierconducteur: DossierConducteurDetailsEditResolver}
        }
      ]}
    ]}
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
  // { path: 'mes-itineraires',
  // data: {
  //   breadcrumb: 'Mes itineraires'
  // },
  // children: [
  //   {path: '', component: TemplateComponent, pathMatch:'full',children: [
  //     {path: '', component: ItineraireComponent, data: {
  //       icon: 'fa-route', title:'Itineraires'
  //     }}
  //   ]},
  // ]},
  { path: 'configuration',
  data: {
    breadcrumb: 'Configuration'
  },
   component: TemplateComponent,children: [
    {path: '', component:ConfigurationTransportComponent, data: {
      icon: 'fa-wrench', title:'Configuration'
    }}
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
