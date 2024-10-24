import { IMaterielEtat, MaterielEtat } from './materiel-etat';
import { IUser, User } from 'src/app/core/models/user';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IMateriel, Materiel } from '../materiel';

export interface IAmortissement extends IBase {
    localisation: string;
    materiel: IMateriel;
    materiel_id: number;
    user: IUser;
    user_id: number;
    etat: IMaterielEtat;
    etat_id: number;
    acquisition: string;
    date: Date;
    prix: number;
}

export class Amortissement implements IAmortissement {
    @adaptableMap('id_postes')
    id: number = 0;

    localisation: string = '';
    acquisition: string = '';

    @adaptableMap('materiel')
    materiel_id: number = null;

    @hasOneMap({field:'visi_materiel',class: Materiel})
    materiel : IMateriel= null;

    @adaptableMap('etat')
    etat_id: number = null;

    @hasOneMap({field:'visi_etat_materiel',class: MaterielEtat})
    etat : IMaterielEtat= null;

    @adaptableMap('personne')
    user_id: number = null;

    @hasOneMap({field:'personne_inscription',class: User})
    user : IUser= null;

    @dateAdaptableMap('date')
    date: Date = new Date();

    prix: number = 0;

    get libelle() {
      return this.materiel ? this.materiel.libelle : '';
    }
}
