import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { MouvementSortieFinance } from '../../models/finance/mouvement-sortie';


@Injectable({
    providedIn: 'root'
})
export class MouvementSortieFinanceFactory extends Factory<MouvementSortieFinance> {
  protected readonly endpoint: string = 'finance-mouvement-sorties';

  constructor() {
    super(MouvementSortieFinance)
  }
}
