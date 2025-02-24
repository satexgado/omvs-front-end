import { IBase } from '../base.interface';

export interface IEntretienType extends IBase {
    condition_entretien: string
}

export class EntretienType implements IEntretienType {
    id: number = 0;
    libelle: string = '';
    condition_entretien: string = '';
}
