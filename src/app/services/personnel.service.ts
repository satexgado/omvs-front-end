import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { DepartementService } from './departement.service';
import { PosteService } from './poste.service';


@Injectable({
    providedIn: 'root'
})

export class PersonnelService extends BaseService {

    private extraDataHasBeenInit = false;
    readonly sexes = ['Masculin', 'Feminin']
    readonly situations_matrimoniales = ['Celibataire', 'Marié(e)'];

    constructor(public posteService: PosteService, public departementService: DepartementService) {
        super('rh/personnel');

        this.posteService.getAll();
        this.departementService.getAll();
    }

}