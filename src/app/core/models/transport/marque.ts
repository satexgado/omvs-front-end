import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IMarque extends IBase {
  description: string;
}

export class Marque implements IMarque {
    @adaptableMap('id_marque')
    id: number = 0;

    @adaptableMap('marque')
    libelle: string = '';

    description: string = '';

}
