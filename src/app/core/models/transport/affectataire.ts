import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IAffectataire extends IBase {
    auto_id: number;
    personnel_id: number;
    personnel:any;
}

export class Affectataire implements IAffectataire {
    id: number = 0;
    libelle: string = '';

    auto_id: number = 0;
    personnel_id: number = 0;
    @adaptableMap('personne_inscription')
    personnel: any = null;
}
