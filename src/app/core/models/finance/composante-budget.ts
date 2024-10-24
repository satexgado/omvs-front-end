import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IRREtendue, RREtendue } from '../comptabilite/rretendue';
import { IRRSousCompte, RRSousCompte } from '../comptabilite/rrsouscompte';
import { IRRSubdivision, RRSubdivision } from '../comptabilite/rrsubdivision';

export interface IComposantebudgetFinance extends IBase {
    description: string;
    sous_compte: IRRSousCompte;
    subdivision: IRRSubdivision;
    etendue: IRREtendue;
    sous_compte_id: number;
    subdivision_id: number;
    etendue_id: number;
}

export class ComposantebudgetFinance implements IComposantebudgetFinance {
    @adaptableMap('id_composante')
    id: number = 0;

    libelle: string = '';

    description: string = '';

    @adaptableMap('sous_compte')
    sous_compte_id: number = null;

    @adaptableMap('subdivision')
    subdivision_id: number = null;

    @adaptableMap('etendue')
    etendue_id: number = null;

    @hasOneMap({field: 'rr_sous_compte', class: RRSousCompte})
    sous_compte: IRRSousCompte =  null;

    @hasOneMap({field: 'rr_subdivision', class: RRSubdivision})
    subdivision: IRRSubdivision =  null;

    @hasOneMap({field: 'rr_etendue_subdivision', class: RREtendue})
    etendue: IRREtendue =  null;

}
