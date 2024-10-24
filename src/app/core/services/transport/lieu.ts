import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { Lieu } from '../../models/transport/lieu';


@Injectable({
    providedIn: 'root'
})
export class LieuFactory extends Factory<Lieu> {
  protected readonly endpoint: string = 'transport/lieus';

  constructor() {
    super(Lieu)
  }
}
