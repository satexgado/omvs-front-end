import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';
import { BonTypeCoupure, IBonTypeCoupure } from './bon-type-coupure';
import { CarburantType, ICarburantType } from './carburant-type';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { BonTypeEngagement, IBonTypeEngagement } from './bon-type-engagement';

export interface IBonCarburantSortie extends IBase {
    coordonnee_id:number;
    coordonnee:ICrCoordonnee;
    type_carburant: number;
    carburant: ICarburantType;
    type_coupure: number;
    coupure:IBonTypeCoupure;
    nombre_coupure:number;
    date_reception:Date;
    type_engagement: number;
    engagement: IBonTypeEngagement;
    quantite_litre: number;
    autorise_par:string;
}

export class BonCarburantSortie implements IBonCarburantSortie {
    id: number = 0;
    libelle: string = '';
    quantite_litre: number = 0;
    autorise_par: string = '';
    coordonnee_id:number = 0;

    @hasOneMap({field:'cr_coordonnee',class:CrCoordonnee})
    coordonnee:ICrCoordonnee = null;
    
    type_carburant: number = 0;
    @hasOneMap({field:'trans_type_carburant', class: CarburantType})
    carburant: ICarburantType = null;
    type_coupure: number = 0;
    @hasOneMap({field:'trans_bon_type_coupure', class: BonTypeCoupure})
    coupure:IBonTypeCoupure = null;
    nombre_coupure:number = 0;
    @dateAdaptableMap('date_reception')
    date_reception:Date = null;
    type_engagement: number = 0;
    @hasOneMap({field:'trans_bon_engagement', class: BonTypeEngagement})
    engagement: IBonTypeEngagement = null;
}
