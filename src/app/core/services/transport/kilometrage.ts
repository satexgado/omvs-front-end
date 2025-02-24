import { Kilometrage } from './../../models/transport/kilometrage';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class KilometrageFactory extends Factory<Kilometrage> {
  protected readonly endpoint: string = 'transport/kilometrages';

  constructor() {
    super(Kilometrage)
  }
}
