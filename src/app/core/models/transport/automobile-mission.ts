import { adaptableMap } from 'src/app/shared/decorator/adapter/adaptable-map';
import { IBase } from '../base.interface';

export interface IAutomobileMission extends IBase {
    mission_id: number;
    auto_id:number;
}

export class AutomobileMission implements IAutomobileMission {
    id: number = 0;

    libelle: string = '';

    mission_id: number=0;
    auto_id:number=0;
}
