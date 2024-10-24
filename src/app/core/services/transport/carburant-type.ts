import { CarburantType } from 'src/app/core/models/transport/carburant-type';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CarburantTypeFactory extends Factory<CarburantType> {
  protected readonly endpoint: string = 'transport/type-carburants';

  constructor() {
    super(CarburantType)
  }
}
