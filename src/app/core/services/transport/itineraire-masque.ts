import { ItineraireMasque } from './../../models/transport/itineraire-masque';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ItineraireMasqueFactory extends Factory<ItineraireMasque> {
  protected readonly endpoint: string = 'transport/masque-itineraires';

  constructor() {
    super(ItineraireMasque)
  }
}
