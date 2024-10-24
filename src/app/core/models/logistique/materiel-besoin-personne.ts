import { IUser, User } from '../user';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IMaterielBesoinPersonne extends IBase {
    date_traite: Date;
    date_reception: Date;
    user_id: number;
    user: IUser;
    besoin_id: number;
    quantite: number;
}

export class MaterielBesoinPersonne implements IMaterielBesoinPersonne {
    @adaptableMap('id_aff_commande_personne')
    id: number = 0;

    libelle: string = '';
    quantite: number = 0;

    @dateAdaptableMap('date_traite')
    date_traite: Date = new Date();

    @dateAdaptableMap('date_reception')
    date_reception: Date = new Date();

    @adaptableMap('personne')
    user_id: number = 0;

    @hasOneMap({field:'personne_inscription', class: User})
    user: IUser = null;

    @adaptableMap('besoin')
    besoin_id: number = 0;

}
