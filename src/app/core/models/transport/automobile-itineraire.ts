import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IAutomobile, Automobile } from './automobile';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { IItineraire, Itineraire } from './itineraire';

export interface IAutomobileItineraire extends IBase {
  automobile_id: number;
  automobile: IAutomobile;
  itineraire_id: number;
  itineraire: IItineraire;
  date_debut: Date;
  date_fin: Date;
  commentaire: string;
}

export class AutomobileItineraire implements IAutomobileItineraire {
    @adaptableMap('id_affectation_itineraire_bus')
    id: number = 0;

    get libelle() {
      return '';
    }

    commentaire: string = '';

    @adaptableMap('automobile')
    automobile_id = 0;

    @hasOneMap({field: 'trans_auto', class: Automobile})
    automobile: IAutomobile = null;

    @adaptableMap('itineraire')
    itineraire_id = 0;

    @hasOneMap({field: 'trans_itineraire', class: Itineraire})
    itineraire: IItineraire = null;

    @dateAdaptableMap('date_debut')
    date_debut = new Date();

    @dateAdaptableMap('date_fin')
    date_fin = new Date();
}
