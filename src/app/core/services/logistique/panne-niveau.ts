import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { PanneNiveau } from 'src/app/core/models/logistique/panne-niveau';


@Injectable({
    providedIn: 'root'
})
export class PanneNiveauFactory extends Factory<PanneNiveau> {
  protected readonly endpoint: string = 'niveau-pannes';

  constructor() {
    super(PanneNiveau)
  }
}
