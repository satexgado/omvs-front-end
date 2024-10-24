import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Modele } from '../../models/transport/modele';


@Injectable({
    providedIn: 'root'
})
export class ModeleFactory extends Factory<Modele> {
  protected readonly endpoint: string = 'transport/modeles';

  constructor() {
    super(Modele)
  }
}
