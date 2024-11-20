import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { Assurance, IAssurance } from './assurance';

export interface IAssurancePaiement extends IBase {
  assurance_id: number;
  assurance: IAssurance;
  date_paiement: Date;
  montant: number;
  type_paiement: string; // chèque, virement, carte, espece, mobile money etc.
}

export class AssurancePaiement implements IAssurancePaiement {
    id: number = 0;
    libelle: string = '';
    montant: number = 0;
    type_paiement: string = 'virement'; // chèque, virement, carte, espece, mobile money etc.

    assurance_id = 0;

    @hasOneMap({field: 'ass_assurance', class: Assurance})
    assurance: IAssurance = null;

    @dateAdaptableMap('date_paiement')
    date_paiement = new Date();


}
