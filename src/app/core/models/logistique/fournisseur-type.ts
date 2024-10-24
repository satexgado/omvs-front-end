import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap} from 'src/app/shared/decorator/adapter/adaptable-map';


export interface IFournisseurType extends IBase {
    description: string;
}

export class FournisseurType implements IFournisseurType {
    @adaptableMap('id_type_fornisseur')
    id: number = 0;

    libelle: string = '';

    description = '';

}
