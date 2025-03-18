import { hasOneMap, hasManyMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IMateriel, Materiel } from './materiel';
import { IBase } from './base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IMaterielCommandePersonne, MaterielCommandePersonne } from './materiel-commande-personne';
import { CrCoordonnee, ICrCoordonnee } from './cr-coordonnee';

export interface IMaterielCommande extends IBase {
    quantite: number;
    prix: number;
    date_commande: Date;
    materiel_id: number;
    materiel: IMateriel;
    coordonnee_id: number;
    coordonnee: ICrCoordonnee;
    affectation_personnes: IMaterielCommandePersonne[];
}

export class MaterielCommande implements IMaterielCommande {
    @adaptableMap('id_acquis_materiel')
    id: number = 0;

    @adaptableMap('designation')
    libelle: string = '';

    prix: number = 0;

    @adaptableMap('quantite_materiel')
    quantite: number = 0;

    @dateAdaptableMap('date_commande')
    date_commande: Date = new Date();

    @adaptableMap('id_materiel')
    materiel_id: number = 0;

    @hasOneMap({field:'visi_materiel', class: Materiel})
    materiel: IMateriel = null;

    coordonnee_id: number = 0;

    @hasOneMap({field:'cr_coordonnee', class: CrCoordonnee})
    coordonnee: ICrCoordonnee = null;

    @hasManyMap({field:'visi_affectation_commande_materiel_personnes', class: MaterielCommandePersonne})
    affectation_personnes: IMaterielCommandePersonne[] = null;
}
