import { DossierConducteur } from './../../models/transport/dossier-conducteur';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DossierConducteurFactory extends Factory<DossierConducteur> {
  protected readonly endpoint: string = 'transport/dossier-conducteurs';

  constructor() {
    super(DossierConducteur)
  }
}
