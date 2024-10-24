import { INiveauUrgence, NiveauUrgence } from './niveau-urgence';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IMateriel, Materiel } from '../materiel';

export interface IBesoin extends IBase {
    description: string;
    materiel: IMateriel;
    materiel_id: number;
    niveau: INiveauUrgence;
    niveau_id: number;
    quantite: number;
    quantite_recu: number;
}

export class Besoin implements IBesoin {
    @adaptableMap('id_postes')
    id: number = 0;

    @adaptableMap('libelle_besoin')
    libelle: string = '';
    description: string = '';
    quantite = 0;
    quantite_recu = 0;

    @adaptableMap('materiel')
    materiel_id: number = null;

    @hasOneMap({field:'visi_materiel',class: Materiel})
    materiel : IMateriel= null;

    @adaptableMap('niveau_urgence')
    niveau_id: number = null;

    @hasOneMap({field:'visi_niveau_urgence_materiel',class: NiveauUrgence})
    niveau : INiveauUrgence= null;
}
