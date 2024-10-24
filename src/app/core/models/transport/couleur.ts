import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface ICouleur extends IBase {
description: string;
}

export class Couleur implements ICouleur {
    @adaptableMap('id_couleur')
    id: number = 0;

    @adaptableMap('couleur')
    libelle: string = '';

    description: string = '';

}
