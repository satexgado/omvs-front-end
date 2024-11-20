import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { AssuranceSinistre } from '../../models/transport/assurance-sinistre';

@Injectable({
    providedIn: 'root'
})
export class AssuranceSinistreFactory extends Factory<AssuranceSinistre> {
  protected readonly endpoint: string = 'transport/assurance-sinistres';

  constructor() {
    super(AssuranceSinistre)
  }
}
