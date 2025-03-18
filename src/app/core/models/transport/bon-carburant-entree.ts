import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { BonCarburant, IBonCarburant } from './bon-carburant';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';


export interface IBonCarburantEntree extends IBase {
    bon_carburant_id:number;
    bon_carburant:IBonCarburant;
    nombre_coupure:number;
    date_emission:Date;
}

export class BonCarburantEntree implements IBonCarburantEntree {
    id: number = 0;
    bon_carburant_id:number = 0;
    nombre_coupure:number = 1;

    get libelle(): string {
        let libelle = '';
        if (this.bon_carburant) {
            libelle += ' ' + this.bon_carburant.libelle;
        }
        return libelle;
    }

    @hasOneMap({field:'trans_bon_carburant',class:BonCarburant})
    bon_carburant:IBonCarburant = null;
    @dateAdaptableMap('date_emission')
    date_emission:Date = new Date();
}
