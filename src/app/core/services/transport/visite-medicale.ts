import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { VisiteMedicale } from '../../models/transport/visite-medicale';


@Injectable({
    providedIn: 'root'
})
export class VisiteMedicaleFactory extends Factory<VisiteMedicale> {
  protected readonly endpoint: string = 'transport/visite-medicales';

  constructor() {
    super(VisiteMedicale)
  }
}
