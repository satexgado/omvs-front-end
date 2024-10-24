import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IRRSousCompte, RRSousCompte } from './rrsouscompte';

export interface IRRSubdivision extends IBase {
    numero_subdivision: string;
    sous_compte_id: number;
    sous_compte: IRRSousCompte;
}

export class RRSubdivision implements IRRSubdivision {
    @adaptableMap('id_numero_compte')
    id: number = 0;

    @adaptableMap('intitule_subdivision')
    libelle: string = '';

    numero_subdivision = '';

    @adaptableMap('sous_compte')
    sous_compte_id: number = 0;

    @hasOneMap({field: 'rr_sous_compte', class: RRSousCompte})
    sous_compte: IRRSousCompte = null;
}
