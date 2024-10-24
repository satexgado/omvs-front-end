import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface ICarburantType extends IBase {

}

export class CarburantType implements ICarburantType {
    @adaptableMap('id_type_carburant')
    id: number = 0;

    @adaptableMap('type_carburant')
    libelle: string = '';

}
