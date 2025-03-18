import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { BonCarburant } from 'src/app/core/models/transport/bon-carburant';


@Injectable({
    providedIn: 'root'
})
export class BonCarburantFactory extends Factory<BonCarburant> {
  protected readonly endpoint: string = 'transport/bon-carburants';

  constructor() {
    super(BonCarburant)
  }
}
