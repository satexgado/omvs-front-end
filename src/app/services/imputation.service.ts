import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class ImputationService extends BaseService {
    constructor() {
        super('mission/imputation');
    }

}