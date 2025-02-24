import { IBase } from 'src/app/core/models/base.interface';
import { dateAdaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { hasOneMap } from 'src/app/shared/decorator/adapter/relation-map';
import { Automobile, IAutomobile } from './automobile';


export interface IKilometrage extends IBase {
    automobile: IAutomobile;
    automobile_id: number;
    kilometrage: number;
    date_donnee: Date;
}

export class Kilometrage implements IKilometrage {
    id: number = 0;
    get libelle() {
        return ''+this.kilometrage
    }
    kilometrage: number = 0;
    automobile_id: number = 0;

    @dateAdaptableMap('date_donnee')
    date_donnee: Date = new Date();

    @hasOneMap({field:'trans_auto',class: Automobile})
    automobile : IAutomobile= null;

}
