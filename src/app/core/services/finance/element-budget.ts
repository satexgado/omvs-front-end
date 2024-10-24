import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { ElementBudgetFinance } from '../../models/finance/element-budget';


@Injectable({
    providedIn: 'root'
})
export class ElementBudgetFinanceFactory extends Factory<ElementBudgetFinance> {
  protected readonly endpoint: string = 'element-budgets';

  constructor() {
    super(ElementBudgetFinance)
  }
}
