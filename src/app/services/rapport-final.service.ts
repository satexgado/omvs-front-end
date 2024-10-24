import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";



@Injectable({
    providedIn: 'root'
})

export class RapportFinalService extends BaseService {
    constructor() {
        super('rapport-final');
    }
    

}