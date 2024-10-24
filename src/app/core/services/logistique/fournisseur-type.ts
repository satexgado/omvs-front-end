import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { FournisseurType } from 'src/app/core/models/logistique/fournisseur-type';


@Injectable({
    providedIn: 'root'
})
export class FournisseurTypeFactory extends Factory<FournisseurType> {
  protected readonly endpoint: string = 'type-fournisseurs';

  constructor() {
    super(FournisseurType)
  }
}
