import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Besoin } from 'src/app/core/models/logistique/besoin';


@Injectable({
    providedIn: 'root'
})
export class BesoinFactory extends Factory<Besoin> {
  protected readonly endpoint: string = 'besoins';

  constructor() {
    super(Besoin)
  }
}
