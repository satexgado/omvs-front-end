import { Factory } from 'src/app/core/services/factory';
import { Injectable } from '@angular/core';
import { BonTypeEngagement } from 'src/app/core/models/transport/bon-type-engagement';


@Injectable({
    providedIn: 'root'
})
export class BonTypeEngagementFactory extends Factory<BonTypeEngagement> {
  protected readonly endpoint: string = 'transport/bon-type-engagements';

  constructor() {
    super(BonTypeEngagement)
  }
}
