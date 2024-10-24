import { ComposanteFinance, IComposanteFinance } from './composante-finance';
import { IBase } from './../base.interface';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IMasqueReductionFinance, MasqueReductionFinance } from './reduction-finance-masque';

export interface IReductionFinance extends IBase {
    masque_id: number;
    masque: IMasqueReductionFinance;
    prix: number;
    composante_id: number;
    composante: IComposanteFinance;
    pourcentage: number;
}

export class ReductionFinance implements IReductionFinance {
    @adaptableMap('id_reduction')
    id: number = 0;

    libelle: string = '';

    @adaptableMap('masque')
    masque_id: number = null;

    @hasOneMap({field:'visi_masque_reduction_finance', class: MasqueReductionFinance})
    masque: IMasqueReductionFinance = null;

    @adaptableMap('composante')
    composante_id: number = null;

    @hasOneMap({field:'visi_composante_finance', class: ComposanteFinance})
    composante: IComposanteFinance = null;

    prix: number = 0;

    pourcentage: number = 0;

}
