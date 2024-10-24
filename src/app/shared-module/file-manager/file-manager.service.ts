import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FileManagerService extends BaseService {
    constructor() {
        super('media');
    }

}