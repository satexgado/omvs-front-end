import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { AutomobileEtat } from '../../models/transport/automobile-etat';

@Injectable({
    providedIn: 'root'
})
export class AutomobileEtatFactory extends Factory<AutomobileEtat> {
  protected readonly endpoint: string = 'transport/etat-automobiles';

  constructor() {
    super(AutomobileEtat)
  }
}
