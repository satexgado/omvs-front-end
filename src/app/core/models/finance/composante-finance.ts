import { IBase } from './../base.interface';
import { hasOneMap, hasManyMap } from 'src/app/shared/decorator/adapter/relation-map';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IElementFinance, ElementFinance } from './element-finance';
import { IMasqueComposanteFinance, MasqueComposanteFinance } from './composante-finance-masque';

export interface IComposanteFinance extends IBase {
    masque_id: number;
    masque: IMasqueComposanteFinance;
    prix: number;
    element_finances?: IElementFinance[];
    prix_global: number | boolean;
    description: string;

}

export class ComposanteFinance implements IComposanteFinance {
    @adaptableMap('id_composante')
    id: number = 0;

    @adaptableMap('libelle_composante')
    libelle: string = '';

    @adaptableMap('masque')
    masque_id: number = null;

    @hasOneMap({field:'visi_masque_composante_finance', class: MasqueComposanteFinance})
    masque: IMasqueComposanteFinance = null;

    @hasManyMap({field:'visi_element_finances', class: ElementFinance})
    element_finances: IElementFinance[] = null;


    prix: number = 0;
    prix_global: number  | boolean = 1;
    description: string = '';

}
