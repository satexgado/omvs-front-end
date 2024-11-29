import { IBase } from '../base.interface';

export interface IBonApprovisionnement extends IBase {
    quantite_specifique:number;
}

export class BonApprovisionnement implements IBonApprovisionnement {
    id: number = 0;
    libelle: string = '';
    quantite_specifique:number = 1;
}
