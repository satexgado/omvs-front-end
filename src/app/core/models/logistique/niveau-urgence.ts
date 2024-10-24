import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface INiveauUrgence extends IBase {
    couleur: string
}

export class NiveauUrgence implements INiveauUrgence {
    @adaptableMap('id_niveau')
    id: number = 0;

    @adaptableMap('libelle_niveau')
    libelle: string = '';

    couleur = null;
}
