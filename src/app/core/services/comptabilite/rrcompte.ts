import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { RRCompte } from 'src/app/core/models/comptabilite/rrcompte';


@Injectable({
    providedIn: 'root'
})
export class RRCompteFactory extends Factory<RRCompte> {
  protected readonly endpoint: string = 'comptabilite/comptes';

  constructor() {
    super(RRCompte)
  }
}
