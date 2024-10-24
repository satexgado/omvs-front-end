import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IModele extends IBase {
  description: string;
}

export class Modele implements IModele {
    @adaptableMap('id_modele')
    id: number = 0;

    @adaptableMap('modele')
    libelle: string = '';

    description: string = '';

}
