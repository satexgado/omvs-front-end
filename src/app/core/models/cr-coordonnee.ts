import { IBase } from 'src/app/core/models/base.interface';
import { hasManyMap } from 'src/app/shared/decorator/adapter/relation-map';
import { CrCoordonneeGroupe, ICrCoordonneeGroupe } from './cr-coordonnee-groupe';
import { CrCoordonneeContact, ICrCoordonneeContact } from './cr-coordonnee-contact';

export interface ICrCoordonnee extends IBase {
  email: string;
  telephone: number;
  adresse: string;
  site: string;
  condition_suivi: string;
  commentaire: string;
  tag: string;
  groupes: ICrCoordonneeGroupe[];
  contacts: ICrCoordonneeContact[];
}

export class CrCoordonnee implements ICrCoordonnee {
    id: number = 0;
    libelle: string = '';
    email = '';
    telephone: number = 0;
    adresse = '';
    condition_suivi = '';
    commentaire = '';
    tag: string = '';
    site: string = '';

    @hasManyMap({field: 'cr_coordonnee_groupes', class: CrCoordonneeGroupe})
    groupes: ICrCoordonneeGroupe[] = null;

    @hasManyMap({field: 'cr_coordonnee_contacts', class: CrCoordonneeContact})
    contacts: ICrCoordonneeContact[] = null;
}
