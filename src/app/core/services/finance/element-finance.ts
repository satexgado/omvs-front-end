import { ElementFinance } from './../../models/finance/element-finance';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ElementFinanceFactory extends Factory<ElementFinance> {
  protected readonly endpoint: string = 'element-finances';

  constructor() {
    super(ElementFinance)
  }
}
