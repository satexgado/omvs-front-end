import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { TransSerie } from '../../models/transport/serie';


@Injectable({
    providedIn: 'root'
})
export class TransSerieFactory extends Factory<TransSerie> {
  protected readonly endpoint: string = 'transport/serie';

  constructor() {
    super(TransSerie)
  }
}
