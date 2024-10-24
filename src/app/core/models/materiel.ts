import { IBase } from './base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IMateriel extends IBase {
    description: string;
    code: string;
    image: string;
}

export class Materiel implements IMateriel {
    id: number = 0;

    @adaptableMap('name')
    libelle: string = '';

    @adaptableMap('code_materiel')
    code: string = '';

    description: string = '';
    image: string = '';

}
