import { MaterielBesoinPersonne } from './../../models/logistique/materiel-besoin-personne';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MaterielBesoinPersonneFactory extends Factory<MaterielBesoinPersonne> {
  protected readonly endpoint: string = 'besoins-personnes';

  constructor() {
    super(MaterielBesoinPersonne)
  }
}
