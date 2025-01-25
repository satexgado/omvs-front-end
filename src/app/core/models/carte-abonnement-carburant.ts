import { IBase } from './base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface ICarteAbonnementCarburant extends IBase {
    type: 'Mensuel' | 'Annuel' | 'Prépayé';
    statut: 'Active' | 'Suspendue' | 'Expirée';
    solde: number;
    date_emission: Date;
    date_expiration: Date;
    personnel_id:number;
    personnel:any;
}

export class CarteAbonnementCarburant implements ICarteAbonnementCarburant {
    id: number = 0;
    libelle: string = '';
    type: 'Mensuel' | 'Annuel' | 'Prépayé' = 'Prépayé';
    statut: 'Active' | 'Suspendue' | 'Expirée' = 'Active';
    solde:number = 0;
    personnel_id: number = 0;
    @dateAdaptableMap('date_emission')
    date_emission: Date = new Date();

    @dateAdaptableMap('date_expiration')
    date_expiration: Date = new Date();

    @adaptableMap('personne_inscription')
    personnel:any = null;
}
