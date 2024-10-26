import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IAutomobile } from 'src/app/core/models/transport/automobile';
@Injectable({
  providedIn: 'root'
})
export class TransportUiService {

    public automobileData$ = new BehaviorSubject<IAutomobile>(null);

    set automobileData(automobileData: IAutomobile) {
        this.automobileData$.next(automobileData);
    }

    constructor() { }
}