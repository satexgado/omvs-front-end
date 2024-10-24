import { Factory } from './factory';
import { Injectable } from '@angular/core';
import { Pays } from '../models/pays';


@Injectable({
    providedIn: 'root'
})
export class PaysFactory extends Factory<Pays> {
  protected readonly endpoint: string = 'pays';

  constructor() {
    super(Pays)
  }
}
