import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class TypeMissionService extends BaseService {
    constructor() {
        super('mission/type');
    }

}