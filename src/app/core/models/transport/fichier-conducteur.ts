import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IBase } from '../base.interface';
import { DossierConducteur, IDossierConducteur } from './dossier-conducteur';
import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';

export interface IFichierConducteur extends IBase {
  conducteur_id: number;
  conducteur: IDossierConducteur;
  document:string;
}

export class FichierConducteur implements IFichierConducteur {
    id: number = 0;
    libelle: string = '';
    @adaptableMap('document_scanne')
    document = '';

    conducteur_id = 0;

    @hasOneMap({field: 'trans_dossier_conducteur', class: DossierConducteur})
    conducteur: IDossierConducteur = null;

}
