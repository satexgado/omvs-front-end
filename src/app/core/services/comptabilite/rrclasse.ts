import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { RRClasse } from 'src/app/core/models/comptabilite/rrclasse';


@Injectable({
    providedIn: 'root'
})
export class RRClasseFactory extends Factory<RRClasse> {
  protected readonly endpoint: string = 'comptabilite/classes';

  constructor() {
    super(RRClasse)
  }
}
