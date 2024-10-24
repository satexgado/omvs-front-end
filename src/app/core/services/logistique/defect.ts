import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Defect } from 'src/app/core/models/logistique/defect';


@Injectable({
    providedIn: 'root'
})
export class DefectFactory extends Factory<Defect> {
  protected readonly endpoint: string = 'defects';

  constructor() {
    super(Defect)
  }
}
