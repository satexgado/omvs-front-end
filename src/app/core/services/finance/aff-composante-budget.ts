import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { AffComposantebudgetFinance } from '../../models/finance/aff-composante-budget';


@Injectable({
    providedIn: 'root'
})
export class AffComposanteBudgetFinanceFactory extends Factory<AffComposantebudgetFinance> {
  protected readonly endpoint: string = 'affectation-composante-budgets';

  constructor() {
    super(AffComposantebudgetFinance)
  }
}
