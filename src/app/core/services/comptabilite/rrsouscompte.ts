import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { RRSousCompte } from 'src/app/core/models/comptabilite/rrsouscompte';


@Injectable({
    providedIn: 'root'
})
export class RRSousCompteFactory extends Factory<RRSousCompte> {
  protected readonly endpoint: string = 'comptabilite/sous-comptes';

  constructor() {
    super(RRSousCompte)
  }
}
