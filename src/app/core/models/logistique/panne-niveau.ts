import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IPanneNiveau extends IBase {
    couleur: string
}

export class PanneNiveau implements IPanneNiveau {
    @adaptableMap('id_niveau')
    id: number = 0;

    @adaptableMap('libelle_niveau')
    libelle: string = '';

    couleur = null;
}
