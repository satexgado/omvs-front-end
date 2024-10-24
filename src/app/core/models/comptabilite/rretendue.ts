import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IRRSubdivision, RRSubdivision } from './rrsubdivision';

export interface IRREtendue extends IBase {
    indice_etendu: string;
    subdivision_id: number;
    subdivision: IRRSubdivision;
}

export class RREtendue implements IRREtendue {
    @adaptableMap('id_numero_etendu')
    id: number = 0;

    @adaptableMap('intitule_etendu')
    libelle: string = '';

    indice_etendu = '';

    @adaptableMap('subdivision')
    subdivision_id: number = 0;

    @hasOneMap({field: 'rr_subdivision', class: RRSubdivision})
    subdivision: IRRSubdivision = null;
}
