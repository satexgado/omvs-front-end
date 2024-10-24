import { IBase } from './../core/models/base.interface';
import { FormGroup, FormArray } from '@angular/forms';

 function enumSelector(definition) {
 return Object.keys(definition)
    .map(key => ({ libelle: definition[key], id: definition[key] }));
}

function resourceToSelect2(resource: IBase | IBase[]) {
  if(!(resource instanceof Array))
  {
    resource = [resource] as IBase[];
  }
  return resource.map((element)=>{
    return {id : element.id ,  text: element.libelle}
  })
}
var print = (data)=>{
    console.log(data);
}

/* Form Helper */
 function shouldShowRequiredError(formGroup: FormGroup, controlName: string ) {
    const control = formGroup.get(controlName);
    if(control){
      return (control.dirty || control.touched) && control.hasError('required');
    }
}

 function isValid(formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName);
    if(control){
        return control.valid;
    }
}

 function getValue(formGroup: FormGroup, controlName: string) {
    const control = formGroup.get(controlName);
    if(control){
        return control.value;
    }
    return false;
}

 function shouldDisableSubmit(formGroup: FormGroup)
{
    return (formGroup.valid && !(formGroup.dirty || formGroup.touched) ) || formGroup.invalid;
}

 function getDirtyState(form: FormGroup, excludeField?: Set<string> ): Object {
    return Object.keys(form.controls).reduce<Object>((dirtyState, controlKey) => {
      const control = form.controls[controlKey];

      if(!(excludeField != null && excludeField.has(controlKey)))
      {
        if (!control.dirty ) {
          return dirtyState;
        }
      }

      if (control instanceof FormGroup) {
        return {
          ...dirtyState,
          [controlKey]: getDirtyState(control),
        };
      }

      return {
        ...dirtyState,
        [controlKey]: control.value,
      };
    }, {});
  }

 function getDirtyStateArray(form: FormArray, excludeField?: Set<string> ): Object {
    return Object.keys(form.controls).reduce<Object>((dirtyState, controlKey) => {
      const control = form.controls[controlKey];

      if(control.value)
      if (!control.dirty) {
        return dirtyState;
      }

      if (control instanceof FormGroup) {
        if(excludeField == null)
        {
          return {
            ...dirtyState,
            [controlKey]: getDirtyState(control),
          };
        }
        return {
          ...dirtyState,
          [controlKey]: getDirtyState(control, excludeField),
        };
      }

      return {
        ...dirtyState,
        [controlKey]: control.value,
      };
    }, {});
  }

 function renameKeys(keysMap, obj) {
    return Object
    .keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
    }), {});
 }
/* Form Helper end*/

/* Compar and equal */
 function isEqual (value, other) {

    // Get the value type
    var type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;


    // Compare properties
    if (type === '[object Array]') {
        for (var i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) return false;
        }
    } else {
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) return false;
            }
        }
    }

    // If nothing failed, return true
    return true;

};
 function compare (item1, item2) {

    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!isEqual(item1, item2)) return false;
    }

    // Otherwise, do a simple comparison
    else {

        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) return false;

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === '[object Function]') {
            if (item1.toString() !== item2.toString()) return false;
        } else {
            if (item1 !== item2) return false;
        }

    }
};
/* Compar and equal END */

function trackByIndex(index, item) {
  return index;
}

function checkOverflow(event) {
  if (event.nativeElement.offsetHeight < event.nativeElement.scrollHeight ||
      event.nativeElement.offsetWidth < event.nativeElement.scrollWidth) {
      return true;
  }
  return false;
}

export {print, enumSelector, shouldShowRequiredError,
    isEqual, compare, isValid, getDirtyState, getDirtyStateArray,
    getValue, renameKeys, shouldDisableSubmit, trackByIndex, checkOverflow,
    resourceToSelect2
}
