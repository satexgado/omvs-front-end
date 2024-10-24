import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Inventaire } from 'src/app/core/models/logistique/inventaire';


@Injectable({
    providedIn: 'root'
})
export class InventaireFactory extends Factory<Inventaire> {
  protected readonly endpoint: string = 'inventaires';

  constructor() {
    super(Inventaire)
  }
}
