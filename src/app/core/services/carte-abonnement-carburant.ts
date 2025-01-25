import { Injectable } from '@angular/core';
import { Factory } from './factory';
import { CarteAbonnementCarburant } from '../models/carte-abonnement-carburant';


@Injectable({
    providedIn: 'root'
})
export class CarteAbonnementCarburantFactory extends Factory<CarteAbonnementCarburant> {
  protected readonly endpoint: string = 'carte-abonnemnent-carburants';

  constructor() {
    super(CarteAbonnementCarburant)
  }

}
