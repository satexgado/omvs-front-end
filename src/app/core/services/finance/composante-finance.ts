import { ComposanteFinance } from './../../models/finance/composante-finance';
import { Injectable } from '@angular/core';
import { Factory } from '../factory';


@Injectable({
    providedIn: 'root'
})
export class ComposanteFinanceFactory extends Factory<ComposanteFinance> {
  protected readonly endpoint: string = 'composante-finances';

  constructor() {
    super(ComposanteFinance)
  }
}
