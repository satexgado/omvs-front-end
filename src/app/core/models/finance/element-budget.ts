import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IMateriel, Materiel } from './../materiel';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from './../base.interface';

export interface IElementBudgetFinance extends IBase {
  materiel_id: number;
  materiel: IMateriel;
  budget_id: number;
  prix: number;
  quantite: number;
}

export class ElementBudgetFinance implements IElementBudgetFinance {
  @adaptableMap('id_element')
  id: number = 0;

  @adaptableMap('libelle_element')
  libelle: string = '';

  @adaptableMap('budget')
  budget_id: number = null;

  @adaptableMap('materiel')
  materiel_id: number = null;

  @hasOneMap({field: 'visi_materiel', class: Materiel})
  materiel: IMateriel = null;

  prix: number = 0;

  quantite: number = 1;

}
