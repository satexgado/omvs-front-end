import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { IAutomobile } from 'src/app/core/models/transport/automobile';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { QueryOptions, Filter } from 'src/app/shared/models/query-options';
import { map } from 'rxjs/operators';

@Injectable()
export class AutomobileDetailsEditResolver implements Resolve<Observable<IAutomobile>> {
  constructor() {}

  resolve( route: ActivatedRouteSnapshot ) {
    const service = new AutomobileFactory()
    const query = new QueryOptions(
      [
        {or: false, filters:[
            new Filter('isIns', true, 'eq'),
            new Filter('id_bus', +route.paramMap.get('idauto'), 'eq')
        ]},
      ],
      ['trans_serie','trans_marque','trans_modele','trans_genre','trans_couleur','trans_type_carburant','trans_type_automobile']
    )
    return service.list(query).pipe(
      map((data) => {
          if(data.data[0])
          {
              return data.data[0];
          }else{
              return null;
          }
      })
  );
  }
}
