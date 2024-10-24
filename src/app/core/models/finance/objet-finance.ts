import { hasManyMap, hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { ComposanteFinance, IComposanteFinance } from './composante-finance';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from './../base.interface';
import { IUser, User } from '../user';
import { IReductionFinance, ReductionFinance } from './reduction-finance';

export interface IObjetFinance extends IBase {
  composante_id: number;
  composante: IComposanteFinance;
  prix: number;
  verser: number;
  difference: number;
  user_id: number;
  user: IUser;
  reductions: IReductionFinance[];
}

export class ObjetFinance implements IObjetFinance {
  @adaptableMap('id_objet')
  id: number = 0;

  get libelle() {
    return this.composante ? this.composante.libelle : '';
  }

  @adaptableMap('composante')
  composante_id: number = null;


  prix: number = 0;
  verser: number = 0;

  @hasOneMap({field:'visi_composante_finance', class: ComposanteFinance})
  composante: IComposanteFinance = null;

  @adaptableMap('personne')
  user_id: number = 0;

  @hasOneMap({field:'personne_inscription', class: User})
  user: IUser = null;

  @hasManyMap({field:'visi_reductions', class: ReductionFinance})
  reductions: IReductionFinance[] = null;

  get difference() {
    return this.verser - this.prix
  }

}
