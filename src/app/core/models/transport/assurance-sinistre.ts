import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { Assurance, IAssurance } from './assurance';

export interface IAssuranceSinistre extends IBase {
  assurance_id: number;
  assurance: IAssurance;
  date_sinistre: Date;
  montant_remboursement: number;
  statut: string; // en attente, traité, refusé
  description: string;
}

export class AssuranceSinistre implements IAssuranceSinistre {
    id: number = 0;
    libelle: string = '';
    description: string = '';
    montant_remboursement: number = 0;
    statut: string = 'traité'; // en attente, traité, refusé

    assurance_id = 0;

    @hasOneMap({field: 'ass_assurance', class: Assurance})
    assurance: IAssurance = null;

    @dateAdaptableMap('date_sinistre')
    date_sinistre = new Date();


}
