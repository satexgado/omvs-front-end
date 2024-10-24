import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { PermiType } from '../../models/transport/permi-type';


@Injectable({
    providedIn: 'root'
})
export class PermiTypeFactory extends Factory<PermiType> {
  protected readonly endpoint: string = 'transport/type-permis';

  constructor() {
    super(PermiType)
  }
}
