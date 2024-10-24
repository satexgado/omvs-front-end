import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class NoteService extends BaseService {
    constructor() {
        super('mission/note');
    }

}