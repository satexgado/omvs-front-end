import { hasOneMap, hasManyMap } from 'src/app/shared/decorator/adapter/relation-map';
import { ILieu, Lieu } from './lieu';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { ItineraireMasque, IItineraireMasque } from './itineraire-masque';

export interface IItineraire extends IBase {
  masque_id: number;
  masque: IItineraireMasque;
  heure_depart: string;
  heure_arrive: string;
  lieu_arrivee: ILieu;
  lieu_arrivee_id: number;
  point_depart: ILieu;
  point_depart_id: number;
  point_arrets: ILieu[];
}

export class Itineraire implements IItineraire {
    heure_depart: string = '';

    heure_arrive: string = '';

    @adaptableMap('id_itineraire')
    id: number = 0;

    @adaptableMap('libelle_itineraire')
    libelle: string = '';

    @adaptableMap('masque')
    masque_id: number = 0;

    @hasOneMap({field:'trans_masque_itineraire', class: ItineraireMasque})
    masque: IItineraireMasque = null;

    @adaptableMap('point_depart')
    point_depart_id: number = 0;

    @hasOneMap({field:'trans_point_depart', class: Lieu})
    point_depart: ILieu = null;

    @adaptableMap('lieu_arrivee')
    lieu_arrivee_id: number = 0;

    @hasOneMap({field:'trans_lieu_arrivee', class: Lieu})
    lieu_arrivee: ILieu = null;

    @hasManyMap({field:'trans_point_arrets', class: Lieu})
    point_arrets: ILieu[] = null;

}
