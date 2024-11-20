import { Component } from '@angular/core';
import { Filter, QueryOptions } from 'src/app/shared/models/query-options';
import { AppTitleService } from 'src/app/shared/services';

@Component({
  selector: 'app-calendrier-transport',
  templateUrl: './calendrier.component.html'
})
export class CalendrierTransportComponent {
  queryOptions
  constructor(
    protected titleservice: AppTitleService) {
      this.queryOptions = new QueryOptions();
      this.queryOptions.filter_groups = [
        {or: true, filters:[new Filter('affectable_type', 'assurance', 'eq'),new Filter('affectable_type', 'auto_visite_technique', 'eq')]},
      ];
      this.queryOptions.includes = [
        'cal_type_calendrier'
      ];
  }

}
