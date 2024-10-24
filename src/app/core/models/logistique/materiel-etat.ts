import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IMaterielEtat extends IBase {
    couleur: string
}

export class MaterielEtat implements IMaterielEtat {
    @adaptableMap('id_etat')
    id: number = 0;

    @adaptableMap('libelle_etat')
    libelle: string = '';

    couleur = '';
}
