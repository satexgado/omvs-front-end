import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { VilleService } from './ville.service';



@Injectable({
    providedIn: 'root'
})

export class EmplacementService extends BaseService {

    constructor(private villeService: VilleService) {
        super('emplacement');

        this.initExtraData();
    }

    initExtraData() {
        this.villeService.getAll();
    }

}