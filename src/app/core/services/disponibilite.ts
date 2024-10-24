import { Factory } from './factory';
import { Injectable } from '@angular/core';
import { Disponibilite } from '../models/disponibilite';


@Injectable({
    providedIn: 'root'
})
export class DisponibiliteFactory extends Factory<Disponibilite> {
  protected readonly endpoint: string = 'disponibilites';

  constructor() {
    super(Disponibilite)
  }
}