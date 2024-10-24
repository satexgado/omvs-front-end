import { Factory } from './factory';
import { Injectable } from '@angular/core';
import { MaterielCommandePersonne } from '../models/materiel-commande-personne';


@Injectable({
    providedIn: 'root'
})
export class MaterielCommandePersonneFactory extends Factory<MaterielCommandePersonne> {
  protected readonly endpoint: string = 'commandes-personnes';

  constructor() {
    super(MaterielCommandePersonne)
  }
}
