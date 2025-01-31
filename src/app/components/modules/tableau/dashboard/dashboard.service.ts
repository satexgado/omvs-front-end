import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { QueryOptions, Sort } from '../../query-options';
import { ChartFormData } from '../../chart-interface';
import * as serverInfo from '../../../../services/server'; 

export interface ListResult {
  current_page: number; data: any; from: number; last_page: number; per_page: number; total: number;
}

export interface QueryParameter {
  libelle: string; query: QueryOptions, couleur: string, type: string
}

export interface Result {
  libelle: string; couleur: string; type: string; data: {libelle: string, data: number}[]
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

  private _cacheDepartements$: Observable<any>;
  protected _loading$ = new BehaviorSubject<boolean>(true);

  private _cachePersonnels$: Observable<any>;
  private _cacheTypes$: Observable<any>;
  private _cacheLocalites$: Observable<any>;
  private _cacheImputations$: Observable<any>;
  private _cachePays$: Observable<any>;
  private _cacheTransports$: Observable<any>;
  private _cacheNiveauMissions$: Observable<any>;
  chartFormData: ChartFormData;

  get loading$() { return this._loading$.asObservable(); }


  constructor( private httpClient: HttpClient ) {  }

  list(queryOptions: QueryParameter[]): Observable<Result[]> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}missions/all`,queryOptions)
      .pipe(map((data: Result[]) => {
        return data;
      }));
  }

  allMissions(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}missions`,queryOptions)
      .pipe(map((data: ListResult) => {
        return data;
      }));
  }

  get allPersonnels$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('nom','asc')];

    if (!this._cachePersonnels$) {
        this._cachePersonnels$ = this.allPersonnels(queryOptions).pipe(
          shareReplay(1)
        );
    }
    return this._cachePersonnels$;
  }

  allTypes(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}types/all`,queryOptions)
      .pipe(map((data: ListResult) => {
        this._loading$.next(false);
        return data.data;
      }));
  }

  get allTypes$()  {
    const queryOptions = new QueryOptions();
    if (!this._cacheTypes$) {
      this._loading$.next(true);
        this._cacheTypes$ = this.allTypes(queryOptions).pipe(
          shareReplay(1)
        );
    }
    return this._cacheTypes$;
}

allImputations(queryOptions: QueryOptions): Observable<ListResult> {
  return this.httpClient
    .post(`${serverInfo.Server.baseUrl}imputations/all`,queryOptions)
    .pipe(map((data: ListResult) => {
      this._loading$.next(false);
      return data.data;
    }));
}

get allImputations$()  {
  const queryOptions = new QueryOptions();
  if (!this._cacheImputations$) {
    this._loading$.next(true);
      this._cacheImputations$ = this.allImputations(queryOptions).pipe(
        shareReplay(1)
      );
  }
  return this._cacheImputations$;
}
  allPersonnels(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}personnels/all`,queryOptions)
      .pipe(map((data: ListResult) => {
        this._loading$.next(false);
        const maped = data.data.map((element)=> {
          element.name = `${element.nom } ${element.prenom}`;
          return element ;
        }
        )
        return data.data;
      }));
  }
  
  get allDepartements$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('name','asc')];
    if (!this._cacheDepartements$) {
      this._loading$.next(true);

        this._cacheDepartements$ = this.allDepartements(queryOptions).pipe(
          shareReplay(1)
        );
    }
    return this._cacheDepartements$;
}
  allDepartements(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}departements/all`,queryOptions)
      .pipe(map((data: ListResult) => {
      this._loading$.next(false);

        return data.data;
      }));
  }

  get allLocalites$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('name','asc')];
    if (!this._cacheLocalites$) {
      this._loading$.next(true);

        this._cacheLocalites$ = this.allLocalites(queryOptions).pipe(
          shareReplay(1)
        );
    }
    return this._cacheLocalites$;
}
  allLocalites(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}localites/all`,queryOptions)
      .pipe(map((data: ListResult) => {
        this._loading$.next(false);

        return data.data;
      }));
  }

  get allPays$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('name','asc')];
    if (!this._cachePays$) {
      this._loading$.next(true);

        this._cachePays$ = this.allPays(queryOptions).pipe(
          shareReplay(1)
        );
    }
    return this._cachePays$;
  }

  allPays(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}pays/all`,queryOptions)
      .pipe(map((data: ListResult) => {
      this._loading$.next(false);

        return data.data;
      }));
  }

  get allTransports$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('name','asc')];
    if (!this._cacheTransports$) {
      this._loading$.next(true);

        this._cacheTransports$ = this.allTransports(queryOptions).pipe(
          shareReplay(1)
        );
    }
    return this._cacheTransports$;
  }
  
  allTransports(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}transports/all`,queryOptions)
      .pipe(map((data: ListResult) => {
      this._loading$.next(false);

        return data.data;
      }));
  }

  get allNiveauMissions$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('name','asc')];
    if (!this._cacheNiveauMissions$) {
      this._loading$.next(true);

        this._cacheNiveauMissions$ = this.allNiveauMissions(queryOptions).pipe(
          shareReplay(1)
        );
    }
    return this._cacheNiveauMissions$;
  }
  
  allNiveauMissions(queryOptions: QueryOptions): Observable<ListResult> {
    return this.httpClient
      .post(`${serverInfo.Server.baseUrl}niveau/mission`,queryOptions)
      .pipe(map((data: ListResult) => {
      this._loading$.next(false);

        return data.data;
      }));
  }
}