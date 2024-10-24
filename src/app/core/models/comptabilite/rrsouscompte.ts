import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IRRCompte, RRCompte } from './rrcompte';

export interface IRRSousCompte extends IBase {
    numero_sous_compte: string;
    compte_id: number;
    compte: IRRCompte;
}

export class RRSousCompte implements IRRSousCompte {
    @adaptableMap('id_numero_compte')
    id: number = 0;

    @adaptableMap('intitule_sous_compte')
    libelle: string = '';

    numero_sous_compte = '';

    @adaptableMap('compte')
    compte_id: number = 0;

    @hasOneMap({field: 'rr_compte', class: RRCompte})
    compte: IRRCompte = null;
}
