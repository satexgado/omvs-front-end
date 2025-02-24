import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Allow optional fields (use Validators.required if needed)
    if (value === null || value === undefined || value === '') {
      return null;
    }

    // Check if it's a valid number
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      return { invalidNumber: true };
    }

    // Check if the number is greater than 0
    if (numericValue <= 0) {
      return { notPositive: true };
    }

    return null; // Valid
  };
}