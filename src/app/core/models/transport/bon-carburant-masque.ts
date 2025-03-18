import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';
import { BonTypeCoupure, IBonTypeCoupure } from './bon-type-coupure';
import { CarburantType, ICarburantType } from './carburant-type';

export interface IBonCarburantMasque extends IBase {
    coordonnee_id:number;
    coordonnee:ICrCoordonnee;
    type_carburant: number;
    carburant: ICarburantType;
    type_coupure: number;
    coupure:IBonTypeCoupure;
}

export class BonCarburantMasque implements IBonCarburantMasque {
    id: number = 0;
    coordonnee_id:number = 0;
    libelle:string= '';

    @hasOneMap({field:'cr_coordonnee',class:CrCoordonnee})
    coordonnee:ICrCoordonnee = null;

    type_carburant: number = 0;
    @hasOneMap({field:'trans_type_carburant', class: CarburantType})
    carburant: ICarburantType = null;
    type_coupure: number = 0;
    @hasOneMap({field:'trans_type_coupure', class: BonTypeCoupure})
    coupure:IBonTypeCoupure = null;
}
