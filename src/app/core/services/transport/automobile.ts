import { Automobile } from 'src/app/core/models/transport/automobile';
import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AutomobileFactory extends Factory<Automobile> {
  protected readonly endpoint: string = 'transport/autos';

  constructor() {
    super(Automobile)
  }
}
