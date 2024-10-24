import { BudgetFinance, IBudgetFinance } from './budget';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from './../base.interface';
import { ComposantebudgetFinance, IComposantebudgetFinance } from './composante-budget';

export interface IMouvementSortieFinance extends IBase {
  budget_id: number;
  budget: IBudgetFinance;
  composante_id: number;
  composante: IComposantebudgetFinance;
  prix: number;
  note: string;
  date: Date;

  composant_libelle: string;
}

export class MouvementSortieFinance implements IMouvementSortieFinance {
  @adaptableMap('id_element')
  id: number = 0;

  libelle: string = '';

  @adaptableMap('budget')
  budget_id: number = null;

  @adaptableMap('composante')
  composante_id: number = null;

  @dateAdaptableMap('date')
  date: Date = new Date();

  prix: number = 0;
  note: string = '';


  @hasOneMap({field:'visi_budget_finance', class: BudgetFinance})
  budget: IBudgetFinance = null;

  @hasOneMap({field:'visi_composante_budget_finance', class: ComposantebudgetFinance})
  composante: IComposantebudgetFinance = null;

  get composant_libelle() {
    return this.composante ? this.composante.libelle : 'Joker';
  }
}
