import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { FichierConducteur } from '../../models/transport/fichier-conducteur';


@Injectable({
    providedIn: 'root'
})
export class FichierConducteurFactory extends Factory<FichierConducteur> {
  protected readonly endpoint: string = 'transport/fichier-conducteurs';

  constructor() {
    super(FichierConducteur)
  }
}
