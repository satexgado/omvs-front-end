import { IMasquebudgetFinance, MasquebudgetFinance } from './budget-masque';
import { IBase } from './../base.interface';
import { hasManyMap, hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { ElementBudgetFinance, IElementBudgetFinance } from './element-budget';

export interface IBudgetFinance extends IBase {
    prix: number;
    masque_id: number;
    masque: IMasquebudgetFinance;
    description: string;
    date_debut: Date;
    date_fin: Date;
}

export class BudgetFinance implements IBudgetFinance {
    @adaptableMap('id_budget')
    id: number = 0;

    @adaptableMap('libelle_budget')
    libelle: string = '';

    @adaptableMap('masque')
    masque_id: number = 0;

    @hasOneMap({field:'visi_masque_budget_finance', class: MasquebudgetFinance})
    masque: IMasquebudgetFinance = null;

    prix: number = 0;
    description: string = '';

    @dateAdaptableMap('date_debut')
    date_debut: Date = new Date();

    @dateAdaptableMap('date_fin')
    date_fin: Date = new Date();


}
