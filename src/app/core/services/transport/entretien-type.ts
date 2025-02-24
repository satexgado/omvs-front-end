import { EntretienType } from './../../models/transport/entretien-type';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class EntretienTypeFactory extends Factory<EntretienType> {
  protected readonly endpoint: string = 'transport/type-entretiens';

  constructor() {
    super(EntretienType)
  }
}
