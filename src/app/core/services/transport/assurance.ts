import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Assurance } from '../../models/transport/assurance';

@Injectable({
    providedIn: 'root'
})
export class AssuranceFactory extends Factory<Assurance> {
  protected readonly endpoint: string = 'transport/assurances';

  constructor() {
    super(Assurance)
  }
}
