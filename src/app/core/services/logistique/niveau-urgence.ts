import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { NiveauUrgence } from '../../models/logistique/niveau-urgence';

@Injectable({
    providedIn: 'root'
})
export class NiveauUrgenceFactory extends Factory<NiveauUrgence> {
  protected readonly endpoint: string = 'niveau-urgences';

  constructor() {
    super(NiveauUrgence)
  }
}
