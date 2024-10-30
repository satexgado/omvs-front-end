import { Injectable } from '@angular/core';
import { CrCoordonneeType } from '../models/cr-coordonnee-type';
import { Factory } from './factory';


@Injectable({
    providedIn: 'root'
})
export class CrCoordonneeTypeFactory extends Factory<CrCoordonneeType> {
  protected readonly endpoint: string = 'coordonnee-types';

  constructor() {
    super(CrCoordonneeType)
  }

}
