 import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Itineraire } from '../../models/transport/itineraire';


@Injectable({
    providedIn: 'root'
})
export class ItineraireFactory extends Factory<Itineraire> {
  protected readonly endpoint: string = 'transport/itineraires';

  constructor() {
    super(Itineraire)
  }
}
