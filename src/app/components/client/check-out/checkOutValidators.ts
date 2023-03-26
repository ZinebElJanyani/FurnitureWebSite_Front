import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';



export class CheckOutValidators{
    

    static minDateValidator(minDate: Date): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
          const date = new Date(control.value);
          if (!date || date < minDate) {
            return { minDateError: {value: control.value} };
          }
          return null;
        };
      }
}