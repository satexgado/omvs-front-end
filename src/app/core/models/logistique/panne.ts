import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap, hasManyMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IPanneNiveau, PanneNiveau } from './panne-niveau';
import { IMateriel, Materiel } from '../materiel';
import { IMaterielPannePersonne, MaterielPannePersonne } from './materiel-panne-personne';


export interface IPanne extends IBase {
    description: string;
    materiel: IMateriel;
    materiel_id: number;
    niveau: IPanneNiveau;
    niveau_id: number;
    date: Date;
    quantite: number;
    // affectation_personnes: IMaterielPannePersonne[];
}

export class Panne implements IPanne {
    @adaptableMap('id_postes')
    id: number = 0;

    @adaptableMap('libelle_panne')
    libelle: string = '';

    description: string = '';
    quantite = 0;

    @dateAdaptableMap('date')
    date: Date = new Date();

    @adaptableMap('materiel')
    materiel_id: number = null;

    @hasOneMap({field:'visi_materiel',class: Materiel})
    materiel : IMateriel= null;

    @adaptableMap('niveau_panne')
    niveau_id: number = null;

    @hasOneMap({field:'visi_niveau_panne_materiel',class: PanneNiveau})
    niveau : IPanneNiveau= null;

    // @hasManyMap({field:'visi_affectation_panne_materiel_personnes', class: MaterielPannePersonne})
    // affectation_personnes: IMaterielPannePersonne[] = null;
}
