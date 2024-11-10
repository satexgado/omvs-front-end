import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { MaterielService } from './materiel.service';

@Injectable({
    providedIn: 'root'
})

export class AutomobileService extends BaseService {
    constructor() {
        super('automobile');
    }

}