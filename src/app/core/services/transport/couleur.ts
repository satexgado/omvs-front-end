import { Couleur } from 'src/app/core/models/transport/couleur';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CouleurFactory extends Factory<Couleur> {
  protected readonly endpoint: string = 'transport/couleurs';

  constructor() {
    super(Couleur)
  }
}
