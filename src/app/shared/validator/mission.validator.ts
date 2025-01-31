import { map, switchMap } from 'rxjs/operators';
import { QueryOptions } from 'src/app/shared/models/query-options/query-options.model';
import { Observable, of, timer } from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { Filter } from 'src/app/shared/models/query-options/filter.model';
import { DashboardService } from 'src/app/components/modules/tableau/dashboard/dashboard.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MissionValidator {

    constructor(private service: DashboardService ) {
    }

   alreadyUsedCodeValidator(defaultVal: string = ''): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return timer(800).pipe(switchMap(()=>{
        if(control.value == defaultVal) {
          return of(null);
        }
        const queryOptions = new QueryOptions([
              {or: false, filters:[new Filter('code', control.value, 'eq')]},
        ]);
        return this.service.allMissions(queryOptions).pipe(
          map((data) =>{
            return (data.data && data.data.length && control.dirty) ? {alreadyUsedCode: true} : null;
            })
          );
        }
      ))
    }
  }
}
