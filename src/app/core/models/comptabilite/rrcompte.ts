import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IRRClasse, RRClasse } from './rrclasse';

export interface IRRCompte extends IBase {
    numero_compte: string;
    classe_id: number;
    classe: IRRClasse;
}

export class RRCompte implements IRRCompte {
    @adaptableMap('id_numero_compte')
    id: number = 0;

    @adaptableMap('intitule_compte')
    libelle: string = '';

    numero_compte = '';

    @adaptableMap('classe')
    classe_id: number = 0;

    @hasOneMap({field: 'rr_classe', class: RRClasse})
    classe: IRRClasse = null;
}
