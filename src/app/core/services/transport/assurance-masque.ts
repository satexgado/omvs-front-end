import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { AssuranceMasque } from '../../models/transport/assurance-masque';

@Injectable({
    providedIn: 'root'
})
export class AssuranceMasqueFactory extends Factory<AssuranceMasque> {
  protected readonly endpoint: string = 'transport/masque-assurances';

  constructor() {
    super(AssuranceMasque)
  }
}
