import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { NoteService } from './note.service';

@Injectable({
    providedIn: 'root'
})

export class EvaluationService extends BaseService {
    constructor(public noteService: NoteService) {
        super('evaluation');

        this.noteService.getAll();
    }
    

}