import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { MaterielService } from './materiel.service';

@Injectable({
    providedIn: 'root'
})

export class EquipementService extends BaseService {
    constructor(public stockService: MaterielService) {
        super('materiel');

        this.initExtraData();
    }


    initExtraData() {
        this.stockService.getAll();
    }

}