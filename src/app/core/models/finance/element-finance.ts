import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from './../base.interface';

export interface IElementFinance extends IBase {
  composante_id: number;
  prix: number;
  quantite: number;
}

export class ElementFinance implements IElementFinance {
  @adaptableMap('id_element')
  id: number = 0;

  @adaptableMap('libelle_element')
  libelle: string = '';

  @adaptableMap('composante')
  composante_id: number = null;


  prix: number = 0;

  quantite: number = 1;

}
