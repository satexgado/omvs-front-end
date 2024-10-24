import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { ObjetFinance, IObjetFinance } from './objet-finance';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from './../base.interface';

export interface IMouvementFinance extends IBase {
  objet_id: number;
  objet: IObjetFinance;
  prix: number;
  note: string;
  date: Date;
}

export class MouvementFinance implements IMouvementFinance {
  @adaptableMap('id_element')
  id: number = 0;

  libelle: string = '';

  @adaptableMap('objet')
  objet_id: number = null;

  @dateAdaptableMap('date')
  date: Date = new Date();

  prix: number = 0;
  note: string = '';


  @hasOneMap({field:'visi_objet_transaction_finance', class: ObjetFinance})
  objet: IObjetFinance = null;

}
