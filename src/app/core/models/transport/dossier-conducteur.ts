import { hasOneMap, hasManyMap } from 'src/app/shared/decorator/adapter/relation-map';
import { Pays } from './../pays';
import { PermiType, IPermiType } from './permi-type';

import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IDossierConducteur extends IBase {
  conducteur_id: number;
  conducteur: any;
  date_obtention: Date;
  type_permis: PermiType[];
  lieu_obtention_permis: Pays;
  lieu_obtention_permis_id: number;
  numero_permis: string;
  etes_vous_fumeur: string;
  depuis_quand_avez_vous_arrete_fumer: string;
  prenez_vous_lalcool: string;
  depuis_quand_avez_vous_arrete_alcool: string;
  avez_vous_difficulter_entendre: string;
  quel_difficulte: string;
  combien_doreille: string;
  laquel: string;
  avez_vous_des_difficultes_voir: string;
  utilisez_vous_des_correcteurs: string;
  avez_vous_consulte_un_specialiste: string;
  a_quand_remonte_votre_consultation: string;
  depuis_combien_de_temps_conduisez_vous_annee: string;
  avez_vous_exercez_autre_part: string;
  reference: string;
}

export class DossierConducteur implements IDossierConducteur {
    @adaptableMap('id_dossieur_conducteur')
    id: number = 0;

    get libelle() {
      if(!this.conducteur){
        return '';
      }
      return  this.conducteur.nom + ' ' + this.conducteur.prenom;
    }

    @dateAdaptableMap('date_obtention')
    date_obtention = new Date();


    numero_permis: string = '';
    etes_vous_fumeur: string = '';
    @adaptableMap('depuis_quand_avez_vous_arrete')
    depuis_quand_avez_vous_arrete_fumer: string = '';
    prenez_vous_lalcool: string = '';
    @adaptableMap('depuis_quand_vous_avez_arrete')
    depuis_quand_avez_vous_arrete_alcool: string = '';
    @adaptableMap('avez_vous_des_difficultes_entrendre')
    avez_vous_difficulter_entendre: string = '';
    @adaptableMap('quel_difficultes')
    quel_difficulte: string = '';
    combien_doreille: string = '';
    @adaptableMap('laquelle')
    laquel: string = '';
    avez_vous_des_difficultes_voir: string = '';
    utilisez_vous_des_correcteurs: string = '';
    avez_vous_consulte_un_specialiste: string = '';
    a_quand_remonte_votre_consultation: string = '';
    depuis_combien_de_temps_conduisez_vous_annee: string = '';
    avez_vous_exercez_autre_part: string = '';
    reference: string = '';

    @adaptableMap('lieu_obtention_permis')
    lieu_obtention_permis_id = 0;
    @hasOneMap({field: 'visi_pays', class: Pays})
    lieu_obtention_permis = null;

    @adaptableMap('cpt_conducteur')
    conducteur: any = null;

    @adaptableMap('conducteur')
    conducteur_id = 0;

    @hasManyMap({field: 'type_permis', class: PermiType})
    type_permis: IPermiType[] = null;
}
