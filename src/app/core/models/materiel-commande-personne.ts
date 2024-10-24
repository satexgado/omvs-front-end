import { IUser, User } from './user';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from './base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IMaterielCommandePersonne extends IBase {
    quantite: number;
    date: Date;
    user_id: number;
    user: IUser;
    commande_id: number;
}

export class MaterielCommandePersonne implements IMaterielCommandePersonne {
    @adaptableMap('id_aff_commande_personne')
    id: number = 0;

    libelle: string = '';

    quantite: number = 0;

    @dateAdaptableMap('date')
    date: Date = new Date();

    @adaptableMap('personne')
    user_id: number = 0;

    @hasOneMap({field:'personne_inscription', class: User})
    user: IUser = null;

    @adaptableMap('commande')
    commande_id: number = 0;

}
