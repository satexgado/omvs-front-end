import { Component, OnInit } from '@angular/core';

enum ValeurEnum {
  nbcoupure = 'Nombre de coupure',
  qtelitre = 'Quantite de litre'
}

enum GroupEnum {
  carburant = 'Carburant',
  automobile = 'Vehicule',
  coupure = 'Coupure',
  engagement = 'Engagement',
}

enum QualiteEnum {
  mois = 'Mois',
  annee = 'Annee',
  carburant = 'Carburant',
  automobile = 'Vehicule',
  coupure = 'Coupure',
  engagement = 'Engagement',
  valeur = 'Valeur',
}

@Component({
  selector: 'app-dashboard-bon-carburant-sortant',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardBonCarburantSortantComponent implements OnInit {


  valeurSelect = [
    {libelle: ValeurEnum.nbcoupure, id: null},
    {libelle: ValeurEnum.qtelitre}
  ];

  groupeSelect = [
    {libelle: GroupEnum.carburant, id: null},
    {libelle: GroupEnum.coupure},
    {libelle: GroupEnum.engagement},
    {libelle: GroupEnum.automobile}
  ];

  qualiteSelect = [
    {libelle: QualiteEnum.annee},
    {libelle: QualiteEnum.carburant, id: null},
    {libelle: QualiteEnum.coupure},
    {libelle: QualiteEnum.engagement},
    {libelle: QualiteEnum.mois},
    {libelle: QualiteEnum.automobile},
    {libelle: QualiteEnum.valeur}
  ];

  multiselectConfig = {
    displayKey:"description",
    search:true ,
    height: 'auto' ,
    placeholder:'Select' ,
    customComparator: ()=>{} ,
    limitTo: 10,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search',
    searchOnKey: 'name',
    clearOnSelection: false
  }

  charts = [];
  filter;

  constructor() { }

  ngOnInit() {
  }

  addChart()
  {
    this.charts.push({});
  }

}
