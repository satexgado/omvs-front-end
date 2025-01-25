import { Injectable } from '@angular/core';
import { Factory } from './factory';
import { CarteRapido } from '../models/carte-rapido';


@Injectable({
    providedIn: 'root'
})
export class CarteRapidoFactory extends Factory<CarteRapido> {
  protected readonly endpoint: string = 'carte-rapidos';

  constructor() {
    super(CarteRapido)
  }

}
