import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface ITransSerie extends IBase {
  description: string;
}

export class TransSerie implements ITransSerie {
    @adaptableMap('id_serie')
    id: number = 0;

    @adaptableMap('serie')
    libelle: string = '';

    description: string = '';

}
