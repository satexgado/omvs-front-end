import { Entretien } from './../../models/transport/entretien';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class EntretienFactory extends Factory<Entretien> {
  protected readonly endpoint: string = 'transport/entretiens';

  constructor() {
    super(Entretien)
  }
}
