import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";



@Injectable({
    providedIn: 'root'
})

export class RapportQuotidienService extends BaseService {
    constructor() {
        super('rapport-quotidien');
    }
    

}