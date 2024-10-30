import { Injectable } from '@angular/core';
import { CrCoordonneeGroupe } from '../models//cr-coordonnee-groupe';
import { Factory } from './factory';


@Injectable({
    providedIn: 'root'
})
export class CrCoordonneeGroupeFactory extends Factory<CrCoordonneeGroupe> {
  protected readonly endpoint: string = 'coordonnee-groupes';

  constructor() {
    super(CrCoordonneeGroupe)
  }

}
