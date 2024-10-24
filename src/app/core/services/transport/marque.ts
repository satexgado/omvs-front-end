import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Marque } from '../../models/transport/marque';


@Injectable({
    providedIn: 'root'
})
export class MarqueFactory extends Factory<Marque> {
  protected readonly endpoint: string = 'transport/marques';

  constructor() {
    super(Marque)
  }
}
