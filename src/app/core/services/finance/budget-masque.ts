import { MasquebudgetFinance } from './../../models/finance/budget-masque';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MasqueBudgetFinanceFactory extends Factory<MasquebudgetFinance> {
  protected readonly endpoint: string = 'masque-budgets';

  constructor() {
    super(MasquebudgetFinance)
  }
}
