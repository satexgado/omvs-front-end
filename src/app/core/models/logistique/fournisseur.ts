import { IUser, User } from './../user';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap} from 'src/app/shared/decorator/adapter/adaptable-map';
import { IFournisseurType, FournisseurType } from './fournisseur-type';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';


export interface IFournisseur extends IBase {
    description: string;
    type: IFournisseurType;
    type_id: number;
    user: IUser;
    user_id: number;
}

export class Fournisseur implements IFournisseur {
    @adaptableMap('id_postes')
    id: number = 0;


    get libelle() {
      return  this.user ? this.user.libelle : '';
    }

    description: string = '';

    @adaptableMap('type_fournisseur')
    type_id: number = null;

    @hasOneMap({field:'visi_type_fournisseur_materiel',class: FournisseurType})
    type : IFournisseurType= null;

    @adaptableMap('personne')
    user_id: number = null;

    @hasOneMap({field:'fournisseur_inscription',class: User})
    user : IUser= null;
}
