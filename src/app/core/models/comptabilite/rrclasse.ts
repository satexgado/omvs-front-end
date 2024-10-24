import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IRRClasse extends IBase {
    classe: string;
    description: string;
}

export class RRClasse implements IRRClasse {
    @adaptableMap('id_classe')
    id: number = 0;

    @adaptableMap('intitule_classe')
    libelle: string = '';

    classe = '';
    description = '';
}
