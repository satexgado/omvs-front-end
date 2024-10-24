import { AutomobileItineraire } from 'src/app/core/models/transport/automobile-itineraire';
import { Injectable } from '@angular/core';
import { Factory } from '../factory';


@Injectable({
    providedIn: 'root'
})
export class AutomobileItineraireFactory extends Factory<AutomobileItineraire> {
  protected readonly endpoint: string = 'transport/auto-itineraires';

  constructor() {
    super(AutomobileItineraire)
  }
}
