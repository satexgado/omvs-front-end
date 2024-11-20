import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IAutomobile, Automobile } from './automobile';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { CrCoordonnee, ICrCoordonnee } from '../cr-coordonnee';

export interface IVisiteTechnique extends IBase {
  auto_id: number;
  automobile: IAutomobile;
  coordonnee_id: number;
  coordonnee: ICrCoordonnee;
  date_visite: Date;
}

export class VisiteTechnique implements IVisiteTechnique {
    id: number = 0;
    @adaptableMap('observations')
    libelle: string = '';

    auto_id = 0;

    @hasOneMap({field: 'trans_auto', class: Automobile})
    automobile: IAutomobile = null;

    coordonnee_id = 0;

    @hasOneMap({field: 'cr_coordonnee', class: CrCoordonnee})
    coordonnee: ICrCoordonnee = null;

    @dateAdaptableMap('date_visite')
    date_visite = new Date();

}
