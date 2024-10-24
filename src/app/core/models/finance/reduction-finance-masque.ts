import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IMasqueReductionFinance extends IBase {
    description: string;
    icon: string;
    slug?: string;
}

export class MasqueReductionFinance implements IMasqueReductionFinance {
    @adaptableMap('id_masque_reduction')
    id: number = 0;

    libelle: string = '';

    description: string = '';

    icon: string = '';

    get slug() {
      return this.libelle;
    }

}
