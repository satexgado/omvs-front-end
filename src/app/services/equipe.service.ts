import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from 'rxjs';
import { RoleService } from './role.service';



@Injectable({
    providedIn: 'root'
})

export class EquipeService extends BaseService {
    constructor(public roleService: RoleService) {
        super('equipe');

        this.roleService.getAll();
    }

    byMission(id: number): Observable<any>{
        return this.get('equipe/par-mission/'+id);
    }
    

}