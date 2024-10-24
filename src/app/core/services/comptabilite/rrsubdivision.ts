import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { RRSubdivision } from 'src/app/core/models/comptabilite/rrsubdivision';


@Injectable({
    providedIn: 'root'
})
export class RRSubdivisionFactory extends Factory<RRSubdivision> {
  protected readonly endpoint: string = 'comptabilite/subdivisions';

  constructor() {
    super(RRSubdivision)
  }
}
