import { MouvementFinance } from './../../models/finance/mouvement-finance';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MouvementFinanceFactory extends Factory<MouvementFinance> {
  protected readonly endpoint: string = 'finance-mouvements';

  constructor() {
    super(MouvementFinance)
  }
}
