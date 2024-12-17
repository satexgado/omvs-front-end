import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { DossierConducteur, IDossierConducteur } from './dossier-conducteur';

export interface IVisiteMedicale extends IBase {
  conducteur_id: number;
  conducteur: IDossierConducteur;
  date_visite: Date;
  diagnostic:string;
  traitements_prescrits:string;
  commentaires:string;
}

export class VisiteMedicale implements IVisiteMedicale {
    id: number = 0;
    libelle: string = '';
    diagnostic: string = '';
    traitements_prescrits: string = '';
    commentaires: string = '';


    conducteur_id = 0;

    @hasOneMap({field: 'trans_dossier_conducteur', class: DossierConducteur})
    conducteur: IDossierConducteur = null;

    @dateAdaptableMap('date_visite')
    date_visite = new Date();

}
