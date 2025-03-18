import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { BonCarburantMasque } from 'src/app/core/models/transport/bon-carburant-masque';


@Injectable({
    providedIn: 'root'
})
export class BonCarburantMasqueFactory extends Factory<BonCarburantMasque> {
  protected readonly endpoint: string = 'transport/bon-carburant-masques';

  constructor() {
    super(BonCarburantMasque)
  }
}
