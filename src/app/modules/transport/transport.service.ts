import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IAutomobile } from 'src/app/core/models/transport/automobile';
import { IDossierConducteur } from 'src/app/core/models/transport/dossier-conducteur';
@Injectable({
  providedIn: 'root'
})
export class TransportUiService {

    public automobileData$ = new BehaviorSubject<IAutomobile>(null);

    set automobileData(automobileData: IAutomobile) {
        this.automobileData$.next(automobileData);
    }

    public conducteurData$ = new BehaviorSubject<IDossierConducteur>(null);

    set conducteurData(conducteurData: IDossierConducteur) {
        this.conducteurData$.next(conducteurData);
    }

    constructor() { }
}