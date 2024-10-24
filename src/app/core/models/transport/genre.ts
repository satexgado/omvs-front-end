import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IGenre extends IBase {
  description: string;
}

export class Genre implements IGenre {
    @adaptableMap('id_genre')
    id: number = 0;

    @adaptableMap('genre')
    libelle: string = '';

    description: string = '';

}
