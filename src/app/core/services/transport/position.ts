import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Position } from '../../models/transport/position';


@Injectable({
    providedIn: 'root'
})
export class PositionFactory extends Factory<Position> {
  protected readonly endpoint: string = 'transport/positions';

  constructor() {
    super(Position)
  }
}
