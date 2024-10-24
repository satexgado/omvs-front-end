export enum ChartType {
    bar = 'bar',
    pie = 'pie',
    scatter = 'scatter',
    line = 'line',
    area = 'area',
  }
  
  export enum ValeurEnum {
    nbmission = 'Nbmission',
    budget = 'Budget',
    note = 'Note',
    nbRapportQuotidient = 'nbRapportQuotidient',
    nbrapportFinal = 'nbRapportFinal',
    nbpersonnel = 'nbPersonnel'
  }
  
  export class ChartFormData {
    valeur: string; qualite: QualiteEnum; chartType: ChartType; datasets: ChartFormDataset[];
  }
  
  export interface ChartFormDataset {
    libelle: string; couleur: string; chartType: ChartType, filters: ChartFormFilter[]
  }
  
  export interface ChartFormFilter {
    type: string, value: string;
  }
  
  
  export enum QualiteEnum {
    mois = 'Mois',
    annee = 'Annee',
    departement = 'Departement',
    personne = 'Personne',
    poste = 'Poste',
    localite = 'Localite',
    pays = 'Pays',
    role = 'Role',
    imputation = 'Imputation',
  }