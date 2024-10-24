import { Injectable } from '@angular/core';
import { BudgetFinance } from '../../models/finance/budget';
import { Factory } from '../factory';


@Injectable({
    providedIn: 'root'
})
export class BudgetFinanceFactory extends Factory<BudgetFinance> {
  protected readonly endpoint: string = 'budgets';

  constructor() {
    super(BudgetFinance)
  }
}
