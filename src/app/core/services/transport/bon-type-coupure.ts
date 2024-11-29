import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { BonTypeCoupure } from 'src/app/core/models/transport/bon-type-coupure';


@Injectable({
    providedIn: 'root'
})
export class BonTypeCoupureFactory extends Factory<BonTypeCoupure> {
  protected readonly endpoint: string = 'transport/bon-type-coupures';

  constructor() {
    super(BonTypeCoupure)
  }
}
