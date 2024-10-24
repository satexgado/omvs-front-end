import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from './base.interface';

export interface IDisponibilite extends IBase {
    available: any;
    available_id: number;
    available_type: string;
    date_debut: Date;
    date_fin: Date
}

export class Disponibilite implements IDisponibilite {
  @adaptableMap('id_etabli')
    id: number = 0;
    available = null;

    @dateAdaptableMap('date_debut')
    date_debut: Date = null;

    @dateAdaptableMap('date_fin')
    date_fin: Date = null;

    available_type = '';
    available_id = null;

    get libelle() {
      return this.available && this.available.libelle ? this.available.libelle : '';
    }

}
