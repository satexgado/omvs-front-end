import { ReductionFinance } from './../../models/finance/reduction-finance';
import { Injectable } from '@angular/core';
import { Factory } from '../factory';


@Injectable({
    providedIn: 'root'
})
export class ReductionFinanceFactory extends Factory<ReductionFinance> {
  protected readonly endpoint: string = 'reduction-finances';

  constructor() {
    super(ReductionFinance)
  }
}
