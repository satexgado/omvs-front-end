import { Factory } from './factory';
import { Injectable } from '@angular/core';
import { MaterielCommande } from '../models/materiel-commande';


@Injectable({
    providedIn: 'root'
})
export class MaterielCommandeFactory extends Factory<MaterielCommande> {
  protected readonly endpoint: string = 'commandes-materiels';

  constructor() {
    super(MaterielCommande)
  }
}
