import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IMasqueComposanteFinance extends IBase {
    description: string;
    icon: string;
}

export class MasqueComposanteFinance implements IMasqueComposanteFinance {
    @adaptableMap('id_masque_composante')
    id: number = 0;

    libelle: string = '';

    description: string = '';

    icon: string = '';

}
