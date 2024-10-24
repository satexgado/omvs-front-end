import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { MaterielEtat } from 'src/app/core/models/logistique/materiel-etat';


@Injectable({
    providedIn: 'root'
})
export class MaterielEtatFactory extends Factory<MaterielEtat> {
  protected readonly endpoint: string = 'etat-materiels';

  constructor() {
    super(MaterielEtat)
  }
}
