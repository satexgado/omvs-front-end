import { MasqueReductionFinance } from './../../models/finance/reduction-finance-masque';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ReductionFinanceMasqueFactory extends Factory<MasqueReductionFinance> {
  protected readonly endpoint: string = 'masque-reduction-finances';

  constructor() {
    super(MasqueReductionFinance)
  }
}
