import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { RREtendue } from 'src/app/core/models/comptabilite/rretendue';


@Injectable({
    providedIn: 'root'
})
export class RREtendueFactory extends Factory<RREtendue> {
  protected readonly endpoint: string = 'comptabilite/etendues';

  constructor() {
    super(RREtendue)
  }
}
