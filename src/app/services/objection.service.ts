import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";



@Injectable({
    providedIn: 'root'
})

export class ObjectionService extends BaseService {
    constructor() {
        super('objection');
    }

}