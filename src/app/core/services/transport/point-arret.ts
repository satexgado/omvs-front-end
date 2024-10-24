import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { PointArret } from '../../models/transport/point-arret';


@Injectable({
    providedIn: 'root'
})
export class PointArretFactory extends Factory<PointArret> {
  protected readonly endpoint: string = 'transport/point-arrets';

  constructor() {
    super(PointArret)
  }
}
