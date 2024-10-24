import { IFournisseur, Fournisseur } from './fournisseur';
import { IUser } from 'src/app/core/models/user';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IMateriel, Materiel } from '../materiel';
import { User } from '../user';


export interface IDefect extends IBase {
    description: string;
    materiel: IMateriel;
    materiel_id: number;
    date_reception: Date;
    date_signalement: Date;
    quantite: number;
    user: IUser;
    user_id:  number;
    fournisseur: IFournisseur;
    fournisseur_id: number;
}

export class Defect implements IDefect {
    @adaptableMap('id_postes')
    id: number = 0;

    libelle: string = '';
    description: string = '';
    quantite = 0;

    @dateAdaptableMap('date_signalement')
    date_signalement: Date = new Date();

    @dateAdaptableMap('date_reception')
    date_reception: Date = new Date();

    @adaptableMap('materiel')
    materiel_id: number = null;

    @hasOneMap({field:'visi_materiel',class: Materiel})
    materiel : IMateriel= null;


    @adaptableMap('personne')
    user_id: number = null;

    @hasOneMap({field:'personne_inscription',class: User})
    user : IUser= null;

    @adaptableMap('fournisseur')
    fournisseur_id: number = null;

    @hasOneMap({field:'visi_fournisseur_materiel',class: Fournisseur})
    fournisseur : IFournisseur= null;
}
