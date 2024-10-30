import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { AutomobilePannePersonne } from '../../models/transport/automobile-panne-personne';


@Injectable({
    providedIn: 'root'
})
export class AutomobilePannePersonneFactory extends Factory<AutomobilePannePersonne> {
  protected readonly endpoint: string = 'transport/pannes-personnes';

  constructor() {
    super(AutomobilePannePersonne)
  }
}
