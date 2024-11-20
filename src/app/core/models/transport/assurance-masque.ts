import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IAutomobile, Automobile } from './automobile';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';

export interface IAssuranceMasque extends IBase {
  coordonnee_id: number;
  coordonnee: ICrCoordonnee;
  date_debut: Date;
  date_fin: Date;
  prime: number;
  periodicite: string; // mensuel, annuel
  duree_periodicite: number; // min 1
  description: string;
}

export class AssuranceMasque implements IAssuranceMasque {
    id: number = 0;
    libelle: string = '';
    description: string = '';
    prime: number = 0;
    periodicite: string = 'mensuel'; // mensuel, annuel
    duree_periodicite: number = 1; // min 1

    coordonnee_id = 0;

    @hasOneMap({field: 'cr_coordonnee', class: CrCoordonnee})
    coordonnee: ICrCoordonnee = null;

    @dateAdaptableMap('date_debut')
    date_debut = new Date();

    @dateAdaptableMap('date_fin')
    date_fin = new Date();
}
