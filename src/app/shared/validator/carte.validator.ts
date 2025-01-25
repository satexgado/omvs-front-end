import { map, switchMap } from 'rxjs/operators';
import { QueryOptions } from 'src/app/shared/models/query-options/query-options.model';
import { Observable, of, timer } from 'rxjs';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { Filter } from 'src/app/shared/models/query-options/filter.model';
import { CrCoordonneeFactory } from 'src/app/core/services/cr-coordonnee';
import { CarteAbonnementCarburantFactory } from 'src/app/core/services/carte-abonnement-carburant';
import { CarteRapidoFactory } from 'src/app/core/services/carte-rapido';
export class CarteValidator {
  static alreadyUsedNumberAbonnementValidator(defaultVal: string = ''): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return timer(800).pipe(switchMap(()=>{
        if(control.value == defaultVal) {
          return of(null);
        }
        const service = new CarteAbonnementCarburantFactory();
        const queryOptions = new QueryOptions([
              {or: false, filters:[new Filter('libelle', control.value, 'eq')]},
        ]);
        return service.list(queryOptions).pipe(
          map((data) =>{
            return (data.data && data.data.length && control.dirty) ? {alreadyUsedNumber: true} : null;
            })
          );
        }
      ))
    }
  }

  static alreadyUsedNumberRapidoValidator(defaultVal: string = ''): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return timer(800).pipe(switchMap(()=>{
        if(control.value == defaultVal) {
          return of(null);
        }
        const service = new CarteRapidoFactory();
        const queryOptions = new QueryOptions([
              {or: false, filters:[new Filter('libelle', control.value, 'eq')]},
        ]);
        return service.list(queryOptions).pipe(
          map((data) =>{
            return (data.data && data.data.length && control.dirty) ? {alreadyUsedNumber: true} : null;
            })
          );
        }
      ))
    }
  }
}
