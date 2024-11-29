import { IBase } from '../base.interface';

export interface IBonTypeCoupure extends IBase {
}

export class BonTypeCoupure implements IBonTypeCoupure {
    id: number = 0;
    libelle: string = '';
}
