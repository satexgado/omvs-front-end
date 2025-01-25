import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';
import { BonApprovisionnement, IBonApprovisionnement } from './bon-approvisionnement';
import { BonTypeCoupure, IBonTypeCoupure } from './bon-type-coupure';
import { CarburantType, ICarburantType } from './carburant-type';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IBonCarburantEntree extends IBase {
    coordonnee_id:number;
    coordonnee:ICrCoordonnee;
    type_carburant: number;
    carburant: ICarburantType;
    type_coupure: number;
    coupure:IBonTypeCoupure;
    nombre_coupure:number;
    date_emission:Date;
    date_expiration:Date;
    approvisionnement_id: number;
    approvisionnement: IBonApprovisionnement
}

export class BonCarburantEntree implements IBonCarburantEntree {
    id: number = 0;
    coordonnee_id:number = 0;

    get libelle(): string {
        let libelle = '';
        if (this.coupure) {
            libelle += this.coupure.libelle;
        }
        if (this.coordonnee) {
            libelle += ' ' + this.coordonnee.libelle;
        }
        return libelle;
    }

    @hasOneMap({field:'cr_coordonnee',class:CrCoordonnee})
    coordonnee:ICrCoordonnee = null;

    type_carburant: number = 0;
    @hasOneMap({field:'trans_type_carburant', class: CarburantType})
    carburant: ICarburantType = null;
    type_coupure: number = 0;
    @hasOneMap({field:'trans_bon_type_coupure', class: BonTypeCoupure})
    coupure:IBonTypeCoupure = null;
    nombre_coupure:number = 1;
    @dateAdaptableMap('date_emission')
    date_emission:Date = new Date();
    @dateAdaptableMap('date_expiration')
    date_expiration:Date = new Date();
    @adaptableMap('approvisionnement')
    approvisionnement_id: number = 0;
    @hasOneMap({field:'trans_bon_approvisionnement', class: BonApprovisionnement})
    approvisionnement: IBonApprovisionnement = null;
}
