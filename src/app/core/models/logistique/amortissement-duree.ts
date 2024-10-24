import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IAmortissementDuree extends IBase {
    amortissement_id: number;
    duree: number;
    duree_avant_remplacement: number;
    alerte: number;
    valeur_prevu: number;
}

export class AmortissementDuree implements IAmortissementDuree {
    @adaptableMap('id_aff_commande_personne')
    id: number = 0;

    libelle: string = '';
    duree: number = 1;
    duree_avant_remplacement: number = 1;
    alerte: number = 1;
    valeur_prevu: number = 1;

    @adaptableMap('amortissement')
    amortissement_id: number = 0;

}
