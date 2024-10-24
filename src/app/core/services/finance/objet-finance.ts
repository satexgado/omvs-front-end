import { ObjetFinance } from './../../models/finance/objet-finance';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ObjetFinanceFactory extends Factory<ObjetFinance> {
  protected readonly endpoint: string = 'finance-objets';

  constructor() {
    super(ObjetFinance)
  }
}
