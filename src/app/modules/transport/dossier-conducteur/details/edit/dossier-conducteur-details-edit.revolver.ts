import { DossierConducteur, IDossierConducteur } from 'src/app/core/models/transport/dossier-conducteur';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { QueryOptions, Filter } from 'src/app/shared/models/query-options';
import { first, map, switchMap } from 'rxjs/operators';
import { CacheService } from 'src/app/shared/services';
import { TransportUiService } from '../../../transport.service';
import { DossierConducteurFactory } from 'src/app/core/services/transport/dossier-conducteur';

@Injectable()
export class DossierConducteurDetailsEditResolver implements Resolve<Observable<IDossierConducteur>> {
  constructor(
    protected cacheService: CacheService,
    protected transService: TransportUiService
  ) {}

  resolve( route: ActivatedRouteSnapshot ): Observable<IDossierConducteur> {
    return this.transService.conducteurData$.pipe(
      first(),
      switchMap((data): Observable<IDossierConducteur> => {
        if (data && data.id == +route.paramMap.get("iddossier")) {
          return of(data);
        }

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
            if (data && data.data.length) {
              this.transService.conducteurData = data.data[0];
              return data.data[0];
            }
            this.transService.conducteurData = null;
            return null;
          })
        );
      })
    );
    
  }
}
