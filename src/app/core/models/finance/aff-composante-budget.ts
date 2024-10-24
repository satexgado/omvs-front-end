import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IComposantebudgetFinance, ComposantebudgetFinance } from './composante-budget';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { BudgetFinance, IBudgetFinance } from './budget';

export interface IAffComposantebudgetFinance extends IBase {
  budget: IBudgetFinance;
  budget_id: number;
  composante_id: number;
  composante: IComposantebudgetFinance;
  prix: number;
}

export class AffComposantebudgetFinance implements IAffComposantebudgetFinance {
    @adaptableMap('id_affectation_cate_etabli')
    id: number = 0;

    prix: number = 0;

    get libelle() {
      return this.composante ? this.composante.libelle : 'Joker';
    }

    @adaptableMap('budget')
    budget_id: number = 0;

    @adaptableMap('composante')
    composante_id: number = 0;

    @hasOneMap({field: 'visi_budget_finance', class: BudgetFinance})
    budget: IBudgetFinance = null;

    @hasOneMap({field: 'visi_composante_budget_finance', class: ComposantebudgetFinance})
    composante: IComposantebudgetFinance = null;
}
