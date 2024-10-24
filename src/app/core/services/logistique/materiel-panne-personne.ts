import { MaterielPannePersonne } from './../../models/logistique/materiel-panne-personne';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MaterielPannePersonneFactory extends Factory<MaterielPannePersonne> {
  protected readonly endpoint: string = 'pannes-personnes';

  constructor() {
    super(MaterielPannePersonne)
  }
}
