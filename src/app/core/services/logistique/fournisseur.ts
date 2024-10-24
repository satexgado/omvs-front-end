import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Fournisseur } from 'src/app/core/models/logistique/fournisseur';


@Injectable({
    providedIn: 'root'
})
export class FournisseurFactory extends Factory<Fournisseur> {
  protected readonly endpoint: string = 'fournisseurs';

  constructor() {
    super(Fournisseur)
  }
}
