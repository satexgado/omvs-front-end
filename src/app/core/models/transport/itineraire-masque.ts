import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IVille, Ville } from './../ville';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IItineraireMasque extends IBase {
  periode: string;
  direction: string;
  ville_id: number;
  ville: IVille;
}

export class ItineraireMasque implements IItineraireMasque {
    @adaptableMap('id_masque_itineraire')
    id: number = 0;

    get libelle() {
      if(!this.ville) {
        return `${this.direction} - ${this.periode}`;
      }
      return `${this.ville.libelle}  - ${this.direction} - ${this.periode}`;
    }

    direction: string = '';

    @adaptableMap('periode_itineraire')
    periode: string = '';

    @adaptableMap('ville')
    ville_id: number = 0;

    @hasOneMap({field:'visi_ville',class: Ville})
    ville: IVille = null;

}
