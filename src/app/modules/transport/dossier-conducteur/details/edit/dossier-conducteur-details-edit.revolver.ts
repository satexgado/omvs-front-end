import { IDossierConducteur } from 'src/app/core/models/transport/dossier-conducteur';
import { DossierConducteurFactory } from 'src/app/core/services/transport/dossier-conducteur';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { QueryOptions, Filter } from 'src/app/shared/models/query-options';
import { map } from 'rxjs/operators';

@Injectable()
export class DossierConducteurDetailsEditResolver implements Resolve<Observable<IDossierConducteur>> {
  constructor() {}

  resolve( route: ActivatedRouteSnapshot ) {
    const service = new DossierConducteurFactory()
    const query = new QueryOptions(
      [
        {or: false, filters:[
            new Filter('isIns', true, 'eq'),
            new Filter('id_dossieur_conducteur', +route.paramMap.get('iddossier'), 'eq')
        ]},
      ],
      ['type_permis','cpt_conducteur','visi_pays']
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
