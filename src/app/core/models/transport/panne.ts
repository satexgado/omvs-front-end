import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap, hasManyMap } from 'src/app/shared/decorator/adapter/relation-map';
import { Automobile, IAutomobile } from './automobile';
import { IPanneNiveau, PanneNiveau } from '../logistique/panne-niveau';


export interface IPanne extends IBase {
    description: string;
    automobile: IAutomobile;
    automobile_id: number;
    niveau: IPanneNiveau;
    niveau_id: number;
    date: Date;
    quantite: number;
    nb_commandes: number;
}

export class Panne implements IPanne {
    @adaptableMap('id_postes')
    id: number = 0;

    @adaptableMap('libelle_panne')
    libelle: string = '';

    description: string = '';
    quantite = 0;
    nb_commandes = 0;

    @dateAdaptableMap('date')
    date: Date = new Date();

    @adaptableMap('automobile')
    automobile_id: number = null;

    @hasOneMap({field:'trans_auto',class: Automobile})
    automobile : IAutomobile= null;

    @adaptableMap('niveau_panne')
    niveau_id: number = null;

    @hasOneMap({field:'visi_niveau_panne_materiel',class: PanneNiveau})
    niveau : IPanneNiveau= null;

}
