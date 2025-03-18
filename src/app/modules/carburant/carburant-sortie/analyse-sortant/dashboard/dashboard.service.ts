import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Filter, QueryOptions, Sort } from 'src/app/shared/models/query-options';
import { ChartFormData } from '../chart-interface';
import { CarburantTypeFactory } from 'src/app/core/services/transport/carburant-type';
import { ISavedState } from 'src/app/core/models/saved-state.model';
import { SavedStateFactory } from 'src/app/core/services/saved-state.factory';
import { AutomobileFactory } from 'src/app/core/services/transport/automobile';
import { BonTypeCoupureFactory } from 'src/app/core/services/transport/bon-type-coupure';
import { BonTypeEngagementFactory } from 'src/app/core/services/transport/bon-type-engagement';
import { environment } from 'src/environments/environment';

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
  protected readonly url: string = environment.api_url;

  protected _loading$ = new BehaviorSubject<boolean>(true);

  private _cacheTypeCarburants$: Observable<any>;
  private _cacheTypeCoupures$: Observable<any>;
  private _cacheTypeEngagements$: Observable<any>;
  private _cacheAutomobiles$: Observable<any>;

  private _cacheSavedStates$: Observable<any>;

  chartFormData: ChartFormData;

  get loading$() { return this._loading$.asObservable(); }


  constructor( protected httpClient: HttpClient ) {  }

  list(queryOptions: QueryParameter[]): Observable<Result[]> {
    return this.httpClient
      .post(`${this.url}/transport/bon-carburant-sorties/analyses-datas`,queryOptions)
      .pipe(map((data: Result[]) => {
        return data;
      }));
  }

  get allTypeCarburants$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('libelle','asc')];
    if (!this._cacheTypeCarburants$) {
      this._loading$.next(true);
        this._cacheTypeCarburants$ = new CarburantTypeFactory().list().pipe(
          shareReplay(1),
          map(data => data.data)
        );
    }
    return this._cacheTypeCarburants$;
}

get allAutomobiles$()  {
  const queryOptions = new QueryOptions();
  queryOptions.sort = [new Sort('designation','asc')];
  if (!this._cacheAutomobiles$) {
    this._loading$.next(true);
      this._cacheAutomobiles$ = new AutomobileFactory().list(queryOptions).pipe(
        shareReplay(1),
        map(data => data.data)
      );
  }
  return this._cacheAutomobiles$;
}

  get allTypeCoupures$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('libelle','asc')];
    if (!this._cacheTypeCoupures$) {
      this._loading$.next(true);
        this._cacheTypeCoupures$ = new BonTypeCoupureFactory().list().pipe(
          shareReplay(1),
          map(data => data.data)
        );
    }
    return this._cacheTypeCoupures$;
  }

  get allTypeEngagements$()  {
    const queryOptions = new QueryOptions();
    queryOptions.sort = [new Sort('libelle','asc')];
    if (!this._cacheTypeEngagements$) {
      this._loading$.next(true);
        this._cacheTypeEngagements$ = new BonTypeEngagementFactory().list().pipe(
          shareReplay(1),
          map(data => data.data)
        );
    }
    return this._cacheTypeEngagements$;
  }

  get allSavedStates$() {
    const queryOptions = new QueryOptions([
      {
        or: false, filters: [
          new Filter('is_ins', false, 'ct'),
          new Filter('module', 'bon carburant sortant', 'eq'),
        ]
      },
    ]);
    queryOptions.sort = [new Sort('updated_at', 'desc')];
    if (!this._cacheSavedStates$) {
      this._loading$.next(true);
      this._cacheSavedStates$ = new SavedStateFactory().list(queryOptions).pipe(
        shareReplay(1),
        map(data => data.data)
      );
    }
    return this._cacheSavedStates$;
  }

  addSavedState(item: ISavedState) {
    this._cacheSavedStates$.subscribe(
      (savedStates) => {
        let data = savedStates ? savedStates : [];
        data.unshift(item);
        this._cacheSavedStates$ = of(data);
      }
    );
}

  addSavedStateTo(item: ISavedState, index = 0) {
    this._cacheSavedStates$.subscribe(
      (savedStates) => {
        let data = savedStates ? savedStates : [];
        data.splice( index, 0, item);
        this._cacheSavedStates$ = of(data);
      }
    );
  }

  updateSavedState(item: ISavedState) {
    this._cacheSavedStates$.subscribe(
      (savedStates) => {
        let data = savedStates ? savedStates : [];
        data = data.map(element => {
          if (element.id === item.id) {
            element = item;
          }
          return element;
        });
        this._cacheSavedStates$ = of(data);
      }
    );
  }

  removeSavedState(id: number) {
    this._cacheSavedStates$.subscribe(
      (savedStates) => {
        const data = savedStates ? savedStates : [];
        const index = data.findIndex(element => element.id === id);
        data.splice(index, 1);
        this._cacheSavedStates$ = of(data);
      }
    );
    
  }


}
