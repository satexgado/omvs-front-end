import { Injectable } from '@angular/core';
import { CrCoordonneeContact } from '../models//cr-coordonnee-contact';
import { Factory } from './factory';


@Injectable({
    providedIn: 'root'
})
export class CrCoordonneeContactFactory extends Factory<CrCoordonneeContact> {
  protected readonly endpoint: string = 'coordonnee-contacts';

  constructor() {
    super(CrCoordonneeContact)
  }

}
