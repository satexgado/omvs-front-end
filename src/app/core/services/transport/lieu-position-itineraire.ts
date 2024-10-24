import { LieuPositionItineraire } from './../../models/transport/lieu-position-itineraire';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LieuPositionItineraireFactory extends Factory<LieuPositionItineraire> {
  protected readonly endpoint: string = 'transport/lieu-position-itineraires';

  constructor() {
    super(LieuPositionItineraire)
  }
}
