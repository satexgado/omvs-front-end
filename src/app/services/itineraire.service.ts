import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { VilleService } from './ville.service';



@Injectable({
    providedIn: 'root'
})

export class ItineraireService extends BaseService {
    constructor(public localiteService: VilleService) {
        super('itineraire');

        this.localiteService.getAll();
    }


}