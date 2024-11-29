import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { BonApprovisionnement } from 'src/app/core/models/transport/bon-approvisionnement';


@Injectable({
    providedIn: 'root'
})
export class BonApprovisionnementFactory extends Factory<BonApprovisionnement> {
  protected readonly endpoint: string = 'transport/bon-approvisionnements';

  constructor() {
    super(BonApprovisionnement)
  }
}
