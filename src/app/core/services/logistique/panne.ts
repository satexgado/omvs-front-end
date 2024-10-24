import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Panne } from 'src/app/core/models/logistique/panne';


@Injectable({
    providedIn: 'root'
})
export class PanneFactory extends Factory<Panne> {
  protected readonly endpoint: string = 'pannes';

  constructor() {
    super(Panne)
  }
}
