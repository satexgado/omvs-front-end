import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { ICouleur, Couleur } from './couleur';
import { IAutomobileType, AutomobileType } from './automobile-type';
import { ICarburantType, CarburantType } from './carburant-type';
import { IGenre, Genre } from './genre';
import { IModele, Modele } from './modele';
import { IMarque, Marque } from './marque';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { ITransSerie, TransSerie } from './serie';

export interface IAutomobile extends IBase {
  type_acquisition: string;
  immatriculation: string;
  numero_chassis: number;
  serie: ITransSerie;
  serie_id: number;
  marque: IMarque;
  marque_id: number;
  modele: IModele;
  modele_id: number;
  genre: IGenre;
  genre_id: number;
  etat_achat: string;
  date_achat: Date;
  montant: number;
  type_carburant: ICarburantType;
  type_carburant_id: number;
  type_automobile: IAutomobileType;
  type_automobile_id: number;
  nombre_place: number;
  nombre_porte: number;
  couleur: ICouleur;
  couleur_id: number;
  kilometrage_durant_achat: number;
  type_transmission: string;
  emission_co2: string;
  nombre_chevaux: number;
  image: string;
}

export class Automobile implements IAutomobile {
    @adaptableMap('id_bus')
    id: number = 0;

    @adaptableMap('designation')
    libelle: string = '';
    type_acquisition: string = '';
    immatriculation: string = '';
    numero_chassis = 0;
    image: string ='';
    etat_achat: string = '';
    montant = 0;
    nombre_place = 0;
    nombre_porte = 0;
    nombre_chevaux = 0;
    kilometrage_durant_achat = 0;
    type_transmission: string = '';
    emission_co2: string = '';

    @dateAdaptableMap('date_achat')
    date_achat = new Date();

    @adaptableMap('serie')
    serie_id = 0;

    @hasOneMap({field:'trans_serie', class: TransSerie})
    serie: ITransSerie = null;

    @adaptableMap('marque')
    marque_id = 0;

    @hasOneMap({field:'trans_marque', class: Marque})
    marque: IMarque = null;

    @adaptableMap('modele')
    modele_id = 0;

    @hasOneMap({field:'trans_modele', class: Modele})
    modele: IModele = null;

    @adaptableMap('genre')
    genre_id = 0;

    @hasOneMap({field:'trans_genre', class: Genre})
    genre: IGenre = null;

    @adaptableMap('couleur')
    couleur_id = 0;

    @hasOneMap({field:'trans_couleur', class: Couleur})
    couleur: ICouleur = null;

    @adaptableMap('type_carburant')
    type_carburant_id = 0;

    @hasOneMap({field:'trans_type_carburant', class: CarburantType})
    type_carburant: ICarburantType = null;

    @adaptableMap('type_automobile')
    type_automobile_id = 0;

    @hasOneMap({field:'trans_type_automobile', class: AutomobileType})
    type_automobile: IAutomobileType = null;
}
