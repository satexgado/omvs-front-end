import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap} from 'src/app/shared/decorator/adapter/adaptable-map';


export interface IPays extends IBase {
} 

export class Pays implements IPays {
    @adaptableMap('id')
    id: number = 0;

    libelle: string = '';

}