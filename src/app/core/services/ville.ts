import { Factory } from './factory';
import { Injectable } from '@angular/core';
import { Ville } from '../models/ville';


@Injectable({
    providedIn: 'root'
})
export class VilleFactory extends Factory<Ville> {
  protected readonly endpoint: string = 'villes';

  constructor() {
    super(Ville)
  }
}
