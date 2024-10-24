import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IUser, User } from 'src/app/core/models/user';
import { PermiType, IPermiType } from './permi-type';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IDocumentPermi extends IBase {
  type_permis_id: number;
  type_permis: IPermiType;
  proprietaire_id: number;
  proprietaire: IUser;
  date_obtention: Date;
  remarque: string;
}

export class DocumentPermi implements IDocumentPermi {
    @adaptableMap('id_document_permis')
    id: number = 0;

    @adaptableMap('titre_document')
    libelle: string = '';

    @adaptableMap('type_permis')
    type_permis_id = 0;

    @hasOneMap({field:'trans_type_permi', class:PermiType})
    type_permis: IPermiType = null;

    @adaptableMap('proprietaire')
    proprietaire_id = 0;

    @hasOneMap({field:'cpt_proprietaire', class:User})
    proprietaire: IUser = null;

    @dateAdaptableMap('date_obtention')
    date_obtention = new Date;

    remarque: string = '';

}
