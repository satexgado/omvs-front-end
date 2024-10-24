import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class MaterielService extends BaseService {
    constructor() {
        super('materiel/designation');
    }

}