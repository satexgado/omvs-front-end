import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";



@Injectable({
    providedIn: 'root'
})

export class RoleService extends BaseService {
    constructor() {
        super('rh/role');
    }

}