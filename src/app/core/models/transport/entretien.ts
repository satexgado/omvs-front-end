import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { Automobile, IAutomobile } from './automobile';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';
import { EntretienType, IEntretienType } from './entretien-type';

export interface IEntretien extends IBase {
    automobile: IAutomobile;
    automobile_id: number;
    coordonnee: ICrCoordonnee;
    coordonnee_id: number;
    type_entretien: IEntretienType;
    type_entretien_id: number;
    statut: 'Oui'|'Non'|'En cours';
    date_debut: Date;
    date_fin: Date;
}

export class Entretien implements IEntretien {
    id: number = 0;
    @adaptableMap('observation')
    libelle: string = '';

    statut: 'Oui'|'Non'|'En cours' = 'Non';
    automobile_id: number = 0;
    coordonnee_id: number = 0;
    type_entretien_id: number = 0;

    @dateAdaptableMap('date_debut')
    date_debut: Date = new Date();

    @dateAdaptableMap('date_fin')
    date_fin: Date = null;

    @hasOneMap({field:'trans_auto',class: Automobile})
    automobile : IAutomobile= null;

    @hasOneMap({field:'cr_coordonnee',class: CrCoordonnee})
    coordonnee : ICrCoordonnee= null;

    @hasOneMap({field:'trans_type_entretien',class: EntretienType})
    type_entretien : IEntretienType= null;
}
