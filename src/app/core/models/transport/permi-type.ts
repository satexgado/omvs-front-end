import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IPermiType extends IBase {
    description:string;
}

export class PermiType implements IPermiType {
    @adaptableMap('id_type_permis')
    id: number = 0;

    @adaptableMap('type_permis')
    libelle: string = '';
    description:string = '';

}
