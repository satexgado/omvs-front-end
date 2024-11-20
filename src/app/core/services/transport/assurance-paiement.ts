import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { AssurancePaiement } from '../../models/transport/assurance-paiement';

@Injectable({
    providedIn: 'root'
})
export class AssurancePaiementFactory extends Factory<AssurancePaiement> {
  protected readonly endpoint: string = 'transport/assurance-paiements';

  constructor() {
    super(AssurancePaiement)
  }
}
