import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IUser, User } from 'src/app/core/models/user';
import { PermiType, IPermiType } from './permi-type';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { DossierType, IDossierType } from './dossier-type';

export interface IDossierMedical extends IBase {
  remarque: string;
  proprietaire: User;
  proprietaire_id: number;
  type_dossier: IDossierType;
  type_dossier_id: number;
  date_obtention: Date;
}

export class DossierMedical implements IDossierMedical {
    @adaptableMap('id_dossier_medicals')
    id: number = 0;

    @adaptableMap('titre_dossier')
    libelle: string = '';

    @adaptableMap('type_dossier')
    type_dossier_id = 0;

    @hasOneMap({field:'trans_type_medical', class:DossierType})
    type_dossier: IPermiType = null;

    @adaptableMap('proprietaire')
    proprietaire_id = 0;

    @hasOneMap({field:'cpt_proprietaire', class:User})
    proprietaire: IUser = null;

    @dateAdaptableMap('date_obtention')
    date_obtention = new Date;

    remarque: string = '';

}
