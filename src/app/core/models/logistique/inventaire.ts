import { IMaterielEtat, MaterielEtat } from './materiel-etat';
import { IUser, User } from 'src/app/core/models/user';
import { IBase } from 'src/app/core/models/base.interface';
import { adaptableMap, dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { IMateriel, Materiel } from '../materiel';

export interface IInventaire extends IBase {
    materiel: IMateriel;
    materiel_id: number;
    prix: number;
    stock_normal: number;
    quantite_defectueux: number;
    quantite_stock: number;
    date: Date;
}

export class Inventaire implements IInventaire {
    @adaptableMap('id_postes')
    id: number = 0;


    @adaptableMap('materiel')
    materiel_id: number = null;

    @hasOneMap({field:'visi_materiel',class: Materiel})
    materiel : IMateriel= null;

    @dateAdaptableMap('date')
    date: Date = new Date();

    prix: number = 0;
    stock_normal: number = 0;
    quantite_defectueux: number = 0;
    quantite_stock = 0;

    get libelle() {
      return this.materiel ? this.materiel.libelle : '';
    }
}
