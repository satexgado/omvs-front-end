import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IDossierType extends IBase {

}

export class DossierType implements IDossierType {
    @adaptableMap('id_type_dossiers')
    id: number = 0;

    @adaptableMap('type_dossiers')
    libelle: string = '';
}
