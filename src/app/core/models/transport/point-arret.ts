import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { ILieu, Lieu } from './lieu';
import { IVille, Ville } from './../ville';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IPointArret extends IBase {
  ville_id: number;
  lieu_id: number;
  ville: IVille;
  lieu: ILieu;
}

export class PointArret implements IPointArret {
    @adaptableMap('id_point_arret')
    id: number = 0;

    @adaptableMap('point_arret')
    libelle: string = '';

    @adaptableMap('ville')
    ville_id: number = 0;

    @adaptableMap('lieu')
    lieu_id: number = 0;

    @hasOneMap({field:'visi_ville', class: Ville})
    ville: IVille = null;

    @hasOneMap({field:'trans_lieu', class: Lieu})
    lieu: ILieu = null;
}
