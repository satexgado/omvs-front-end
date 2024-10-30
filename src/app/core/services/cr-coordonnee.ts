import { Injectable } from '@angular/core';
import { CrCoordonnee } from '../models/cr-coordonnee';
import { Factory } from './factory';


@Injectable({
    providedIn: 'root'
})
export class CrCoordonneeFactory extends Factory<CrCoordonnee> {
  protected readonly endpoint: string = 'coordonnees';

  constructor() {
    super(CrCoordonnee)
  }

}
