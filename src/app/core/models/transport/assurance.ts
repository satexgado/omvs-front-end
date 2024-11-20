import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IAutomobile, Automobile } from './automobile';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';

export interface IAssurance extends IBase {
  auto_id: number;
  automobile: IAutomobile;
  coordonnee_id: number;
  coordonnee: ICrCoordonnee;
  date_debut: Date;
  date_fin: Date;
  etat_contrat: string; // actif, expiré, suspendu
  prime: number;
  periodicite: string; // mensuel, annuel
  duree_periodicite: number; // min 1
  description: string;
  numero_contrat: string;
}

export class Assurance implements IAssurance {
    id: number = 0;
    libelle: string = '';
    description: string = '';
    etat_contrat: string = 'actif'; // actif, expiré, suspendu
    prime: number = 0;
    periodicite: string = 'mois'; // mensuel, annuel
    duree_periodicite: number = 1; // min 1
    numero_contrat: string = '';

    auto_id: number = 0;

    @hasOneMap({field: 'trans_auto', class: Automobile})
    automobile: IAutomobile = null;

    coordonnee_id = 0;

    @hasOneMap({field: 'cr_coordonnee', class: CrCoordonnee})
    coordonnee: ICrCoordonnee = null;

    @dateAdaptableMap('date_debut')
    date_debut = new Date();

    @dateAdaptableMap('date_fin')
    date_fin = new Date();
}
