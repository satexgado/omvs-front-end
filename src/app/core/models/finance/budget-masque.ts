import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IMasquebudgetFinance extends IBase {
    description: string;
}

export class MasquebudgetFinance implements IMasquebudgetFinance {
    @adaptableMap('id_masque')
    id: number = 0;

    libelle: string = '';

    description: string = '';

}
