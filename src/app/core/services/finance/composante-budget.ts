import { ComposantebudgetFinance } from './../../models/finance/composante-budget';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ComposanteBudgetFinanceFactory extends Factory<ComposantebudgetFinance> {
  protected readonly endpoint: string = 'composante-budgets';

  constructor() {
    super(ComposantebudgetFinance)
  }
}
