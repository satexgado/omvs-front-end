import { DossierType } from './../../models/transport/dossier-type';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DossierTypeFactory extends Factory<DossierType> {
  protected readonly endpoint: string = 'transport/type-dossier-medicals';

  constructor() {
    super(DossierType)
  }
}
