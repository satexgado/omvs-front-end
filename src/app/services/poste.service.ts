import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";



@Injectable({
    providedIn: 'root'
})

export class PosteService extends BaseService {
    constructor() {
        super('rh/poste');
    }

}