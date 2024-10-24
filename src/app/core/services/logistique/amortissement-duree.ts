import { AmortissementDuree } from 'src/app/core/models/logistique/amortissement-duree';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AmortissementDureeFactory extends Factory<AmortissementDuree> {
  protected readonly endpoint: string = 'amortissement-durees';

  constructor() {
    super(AmortissementDuree)
  }
}
