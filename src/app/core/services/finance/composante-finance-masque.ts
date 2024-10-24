import { MasqueComposanteFinance } from './../../models/finance/composante-finance-masque';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ComposanteFinanceMasqueFactory extends Factory<MasqueComposanteFinance> {
  protected readonly endpoint: string = 'masque-composante-finances';

  constructor() {
    super(MasqueComposanteFinance)
  }
}
