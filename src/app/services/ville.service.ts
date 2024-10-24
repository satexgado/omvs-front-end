import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { PaysService } from './pays.service';



@Injectable({
    providedIn: 'root'
})

export class VilleService extends BaseService {

    constructor(private paysService: PaysService) {
        super('ville');

        this.initExtraData();
    }

    initExtraData() {
        this.paysService.getAll();
      }



}