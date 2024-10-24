import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IAutomobileType extends IBase {

}

export class AutomobileType implements IAutomobileType {
    @adaptableMap('id_type_automobile')
    id: number = 0;

    @adaptableMap('type_automobile')
    libelle: string = '';

}
