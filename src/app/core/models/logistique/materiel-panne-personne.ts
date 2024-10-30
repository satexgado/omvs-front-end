import { IUser, User } from '../user';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IMaterielEtat, MaterielEtat } from './materiel-etat';
import { IBase } from '../base.interface';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';

export interface IMaterielPannePersonne extends IBase {
    date_sortie: Date;
    date_retour: Date;
    user_id: number;
    user: IUser;
    etat_id: number;
    etat: IMaterielEtat;
    fournisseur_id: number;
    fournisseur: ICrCoordonnee;
    panne_id: number;
}

export class MaterielPannePersonne implements IMaterielPannePersonne {
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

    @adaptableMap('fournisseur')
    fournisseur_id: number = 0;

    @hasOneMap({field:'cr_coordonnee', class: CrCoordonnee})
    fournisseur: ICrCoordonnee = null;

    @adaptableMap('panne')
    panne_id: number = 0;

}
