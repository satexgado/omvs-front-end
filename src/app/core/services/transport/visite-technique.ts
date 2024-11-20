import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { VisiteTechnique } from '../../models/transport/visite-technique';

@Injectable({
    providedIn: 'root'
})
export class VisiteTechniqueFactory extends Factory<VisiteTechnique> {
  protected readonly endpoint: string = 'transport/visite-techniques';

  constructor() {
    super(VisiteTechnique)

  }
}
