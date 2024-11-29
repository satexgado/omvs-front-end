import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { BonCarburantEntree } from 'src/app/core/models/transport/bon-carburant-entree';


@Injectable({
    providedIn: 'root'
})
export class BonCarburantEntreeFactory extends Factory<BonCarburantEntree> {
  protected readonly endpoint: string = 'transport/bon-carburant-entrees';

  constructor() {
    super(BonCarburantEntree)
  }
}
