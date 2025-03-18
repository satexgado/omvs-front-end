import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { BonTypeCoupure, IBonTypeCoupure } from './bon-type-coupure';
import { CarburantType, ICarburantType } from './carburant-type';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { BonTypeEngagement, IBonTypeEngagement } from './bon-type-engagement';
import { Automobile, IAutomobile } from './automobile';
import { BonCarburant, IBonCarburant } from './bon-carburant';

export interface IBonCarburantSortie extends IBase {
    bon_carburant_id:number;
    bon_carburant:IBonCarburant;
    auto_id:number;
    automobile:IAutomobile;
    nombre_coupure:number;
    date_reception:Date;
    type_engagement: number;
    engagement: IBonTypeEngagement;
    autorise_par:number;
    personnel_autorisation: any;
}

export class BonCarburantSortie implements IBonCarburantSortie {
    id: number = 0;
    bon_carburant_id:number = 0;

    get libelle(): string {
        let libelle = '';
        if (this.bon_carburant) {
            libelle += ' ' + this.bon_carburant.libelle;
        }
        return libelle;
    }
    
    autorise_par: number = 1;
    auto_id:number = 0;
    personnel_autorisation: any = null;

    @hasOneMap({field:'trans_auto',class:Automobile})
    automobile:IAutomobile = null;
    
    nombre_coupure:number = 1;
    @dateAdaptableMap('date_reception')
    date_reception:Date = new Date();
    type_engagement: number = 0;
    @hasOneMap({field:'trans_bon_type_engagement', class: BonTypeEngagement})
    engagement: IBonTypeEngagement = null;

    @hasOneMap({field:'trans_bon_carburant',class:BonCarburant})
    bon_carburant:IBonCarburant = null;
}
