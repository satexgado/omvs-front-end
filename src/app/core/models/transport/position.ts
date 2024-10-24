import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IPosition extends IBase {
  description: string;
}

export class Position implements IPosition {
    @adaptableMap('id_position')
    id: number = 0;

    @adaptableMap('position')
    libelle: string = '';

    description: string = '';

}
