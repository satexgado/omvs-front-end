import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { BonCarburantMasque, IBonCarburantMasque } from './bon-carburant-masque';

export interface IBonCarburant extends IBase {
    date_expiration:Date;
    masque_bon_carburant_id:number;
    masque_bon_carburant:IBonCarburantMasque;
    quantiteEnStock:number;
}

export class BonCarburant implements IBonCarburant {
    id: number = 0;
    quantiteEnStock: number = 0;
    @adaptableMap('masque_bon_carburant')
    masque_bon_carburant_id:number = 0;
    @dateAdaptableMap('date_expiration')
    date_expiration:Date = new Date();

    get libelle(): string {
        let libelle = '';
        if (this.masque_bon_carburant) {
            libelle += this.masque_bon_carburant.libelle;
        }
        return libelle;
    }


    @hasOneMap({field:'trans_bon_carburant_masque', class: BonCarburantMasque})
    masque_bon_carburant: IBonCarburantMasque = null;
}
