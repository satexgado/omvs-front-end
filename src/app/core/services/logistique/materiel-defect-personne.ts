import { MaterielDefectPersonne } from './../../models/logistique/materiel-defect-personne';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MaterielDefectPersonneFactory extends Factory<MaterielDefectPersonne> {
  protected readonly endpoint: string = 'defects-personnes';

  constructor() {
    super(MaterielDefectPersonne)
  }
}
