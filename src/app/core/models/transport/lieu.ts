import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface ILieu extends IBase {
  description: string;
}

export class Lieu implements ILieu {
    @adaptableMap('id_lieu')
    id: number = 0;

    @adaptableMap('lieu')
    libelle: string = '';

    description: string = '';

}
