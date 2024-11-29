import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { BonCarburantSortie } from 'src/app/core/models/transport/bon-carburant-sortie';


@Injectable({
    providedIn: 'root'
})
export class BonCarburantSortieFactory extends Factory<BonCarburantSortie> {
  protected readonly endpoint: string = 'transport/bon-carburant-sorties';

  constructor() {
    super(BonCarburantSortie)
  }
}
