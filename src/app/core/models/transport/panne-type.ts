import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap} from 'src/app/shared/decorator/adapter/adaptable-map';


export interface IPanneType extends IBase {
    description: string;
}

export class PanneType implements IPanneType {
    @adaptableMap('id_type_panne')
    id: number = 0;

    libelle: string = '';

    description = '';

}
