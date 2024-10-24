import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { PanneType } from 'src/app/core/models/logistique/panne-type';


@Injectable({
    providedIn: 'root'
})
export class PanneTypeFactory extends Factory<PanneType> {
  protected readonly endpoint: string = 'type-pannes';

  constructor() {
    super(PanneType)
  }
}
