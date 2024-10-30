import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { PanneType } from 'src/app/core/models/transport/panne-type';


@Injectable({
    providedIn: 'root'
})
export class PanneTypeFactory extends Factory<PanneType> {
  protected readonly endpoint: string = 'transport/type-pannes';

  constructor() {
    super(PanneType)
  }
}
