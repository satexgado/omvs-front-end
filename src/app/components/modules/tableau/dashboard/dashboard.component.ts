import { Component, OnInit } from '@angular/core';

enum ValeurEnum {
  nbmission = 'Nombre de mission',
  budget = 'Budget',
  Evaluation = 'Evaluation',
  nbrapportQuotidient = 'Nombre de rapport quotidient',
  nbrapportFinal = 'Nombre de rapport final',
  nbpersonnel = 'Nombre de personne'
}

enum GroupEnum {
  mission = 'Mission',
  departement = 'Departement',
  personne = 'Personne',
  poste = 'Poste',
  imputation = 'imputation'
}

enum QualiteEnum {
  mois = 'Mois',
  annee = 'Année',
  departement = 'Departement',
  personne = 'Personne',
  poste = 'Poste',
  localite = 'localité',
  pays = 'Pays',
  role = 'Rôle',
  imputation = 'Imputation',
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  valeurSelect = [
    {libelle: ValeurEnum.nbmission, id: null},
    {libelle: ValeurEnum.Evaluation},
    {libelle: ValeurEnum.budget},
    {libelle: ValeurEnum.nbrapportFinal},
    {libelle: ValeurEnum.nbrapportQuotidient},
    {libelle: ValeurEnum.nbpersonnel},
  ];

  groupeSelect = [
    {libelle: GroupEnum.mission, id: null},
    {libelle: GroupEnum.departement},
    {libelle: GroupEnum.personne},
    {libelle: GroupEnum.poste},
  ];

  qualiteSelect = [
    {libelle: QualiteEnum.imputation, id: null},
    {libelle: QualiteEnum.mois},
    {libelle: QualiteEnum.annee},
    {libelle: QualiteEnum.departement},
    {libelle: QualiteEnum.personne},
    {libelle: QualiteEnum.poste},
    {libelle: QualiteEnum.localite},
    {libelle: QualiteEnum.pays},
    {libelle: QualiteEnum.role},
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

  constructor() { }

  ngOnInit() {
  }

  addChart()
  {
    this.charts.push({});
  }

}
