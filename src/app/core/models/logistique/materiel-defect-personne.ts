import { IUser, User } from '../user';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IMaterielEtat, MaterielEtat } from './materiel-etat';
import { IBase } from '../base.interface';

export interface IMaterielDefectPersonne extends IBase {
    date_sortie: Date;
    date_retour: Date;
    user_id: number;
    user: IUser;
    etat_id: number;
    etat: IMaterielEtat;
    defect_id: number;
}

export class MaterielDefectPersonne implements IMaterielDefectPersonne {
    @adaptableMap('id_aff_commande_personne')
    id: number = 0;

    libelle: string = '';

    @dateAdaptableMap('date_sortie')
    date_sortie: Date = new Date();

    @dateAdaptableMap('date_retour')
    date_retour: Date = new Date();


    @adaptableMap('personne')
    user_id: number = 0;

    @hasOneMap({field:'personne_inscription', class: User})
    user: IUser = null;

    @adaptableMap('etat')
    etat_id: number = 0;

    @hasOneMap({field:'visi_etat_materiel', class: MaterielEtat})
    etat: IMaterielEtat = null;

    @adaptableMap('defect')
    defect_id: number = 0;

}
