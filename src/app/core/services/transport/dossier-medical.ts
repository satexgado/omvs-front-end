import { DossierMedical } from './../../models/transport/dossier-medical';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DossierMedicalFactory extends Factory<DossierMedical> {
  protected readonly endpoint: string = 'transport/dossier-medicals';

  constructor() {
    super(DossierMedical)
  }
}
