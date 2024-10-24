import { Factory } from './factory';
import { Injectable } from '@angular/core';
import { Materiel } from '../models/materiel';


@Injectable({
    providedIn: 'root'
})
export class MaterielFactory extends Factory<Materiel> {
  protected readonly endpoint: string = 'materiels';

  constructor() {
    super(Materiel)
  }
}
