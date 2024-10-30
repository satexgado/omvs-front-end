import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap} from 'src/app/shared/decorator/adapter/adaptable-map';


export interface ICrCoordonneeType extends IBase {
}

export class CrCoordonneeType implements ICrCoordonneeType {
    @adaptableMap('id_type_panne')
    id: number = 0;

    libelle: string = '';

}
