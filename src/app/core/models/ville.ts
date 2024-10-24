import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap} from 'src/app/shared/decorator/adapter/adaptable-map';


export interface IVille extends IBase {
  pays_id: number;
}

export class Ville implements IVille {
    @adaptableMap('id')
    id: number = 0;

    libelle: string = '';

    @adaptableMap('pays')
    pays_id: number = 0

}
