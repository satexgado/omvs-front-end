import { IBase } from '../base.interface';

export interface IBonTypeEngagement extends IBase {
}

export class BonTypeEngagement implements IBonTypeEngagement {
    id: number = 0;
    libelle: string = '';
}
