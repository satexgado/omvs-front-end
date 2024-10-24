import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Amortissement } from 'src/app/core/models/logistique/amortissement';


@Injectable({
    providedIn: 'root'
})
export class AmortissementFactory extends Factory<Amortissement> {
  protected readonly endpoint: string = 'amortissements';

  constructor() {
    super(Amortissement)
  }
}
