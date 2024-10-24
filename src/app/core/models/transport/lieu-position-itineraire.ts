import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IPosition, Position } from './position';
import { IItineraire, Itineraire } from './itineraire';
import { IPointArret, PointArret } from './point-arret';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';
import { ILieu, Lieu } from './lieu';

export interface ILieuPositionItineraire extends IBase {
  itineraire: IItineraire;
  lieu: ILieu;
  point_arret: IPointArret;
  position: IPosition;

  itineraire_id: number;
  lieu_id: number;
  point_arret_id: number;
  position_id: number;
}

export class LieuPositionItineraire implements ILieuPositionItineraire {
    @adaptableMap('id_lieu_position')
    id: number = 0;

    @adaptableMap('lieu')
    libelle: string = '';

    description: string = '';

    @adaptableMap('itineraire')
    itineraire_id = 0;

    @hasOneMap({field: 'trans_itineraire', class: Itineraire})
    itineraire: IItineraire = null;

    @adaptableMap('lieu')
    lieu_id = 0;

    @hasOneMap({field: 'trans_lieu', class: Lieu})
    lieu: ILieu = null;

    @adaptableMap('point_arret')
    point_arret_id = 0;

    @hasOneMap({field: 'trans_point_arret', class: PointArret})
    point_arret: IPointArret = null;

    @adaptableMap('position')
    position_id = 0;

    @hasOneMap({field: 'trans_position', class: Position})
    position: IPosition = null;

}
