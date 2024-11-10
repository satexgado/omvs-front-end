import { AutomobileMission } from 'src/app/core/models/transport/automobile-mission';
import { Injectable } from '@angular/core';
import { Factory } from '../factory';


@Injectable({
    providedIn: 'root'
})
export class AutomobileMissionFactory extends Factory<AutomobileMission> {
  protected readonly endpoint: string = 'transport/auto-missions';

  constructor() {
    super(AutomobileMission)
  }
}
