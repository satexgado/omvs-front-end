import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { BonTypeCoupure, IBonTypeCoupure } from './bon-type-coupure';
import { CarburantType, ICarburantType } from './carburant-type';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { BonTypeEngagement, IBonTypeEngagement } from './bon-type-engagement';
import { Automobile, IAutomobile } from './automobile';

export interface IBonCarburantSortie extends IBase {
    auto_id:number;
    automobile:IAutomobile;
    type_carburant: number;
    carburant: ICarburantType;
    type_coupure: number;
    coupure:IBonTypeCoupure;
    nombre_coupure:number;
    date_reception:Date;
    type_engagement: number;
    engagement: IBonTypeEngagement;
    quantite_litre: number;
    autorise_par:number;
    personnel_autorisation: any;
}

export class BonCarburantSortie implements IBonCarburantSortie {
    id: number = 0;
    libelle: string = '';
    quantite_litre: number = 0;
    autorise_par: number = 1;
    auto_id:number = 0;
    personnel_autorisation: any = null;

    @hasOneMap({field:'trans_auto',class:Automobile})
    automobile:IAutomobile = null;
    
    type_carburant: number = 0;
    @hasOneMap({field:'trans_type_carburant', class: CarburantType})
    carburant: ICarburantType = null;
    type_coupure: number = 0;
    @hasOneMap({field:'trans_bon_type_coupure', class: BonTypeCoupure})
    coupure:IBonTypeCoupure = null;
    nombre_coupure:number = 1;
    @dateAdaptableMap('date_reception')
    date_reception:Date = new Date();
    type_engagement: number = 0;
    @hasOneMap({field:'trans_bon_type_engagement', class: BonTypeEngagement})
    engagement: IBonTypeEngagement = null;
}
