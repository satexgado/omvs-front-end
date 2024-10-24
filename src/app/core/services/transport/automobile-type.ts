import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { AutomobileType } from 'src/app/core/models/transport/automobile-type';

@Injectable({
    providedIn: 'root'
})
export class AutomobileTypeFactory extends Factory<AutomobileType> {
  protected readonly endpoint: string = 'transport/type-automobiles';

  constructor() {
    super(AutomobileType)
  }
}
