import { Injectable, DebugElement } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable({
    providedIn: 'root'
  })
export class Service {
    //Validate Form elements on submit
  ValidateAllFormFields(form: any) {
    var controls = form.controls;
    var controlKeys = Object.keys(form.controls);
    controlKeys.forEach(function (value) {
      controls[value].markAsTouched();
    });
    this.scrollIfFormHasErrors(form).then(() => {
      // Run any additional functionality if you need to. 
    });
  };

  //scrolls to error box
  async scrollIfFormHasErrors(form: FormGroup): Promise<any> {
    await form.invalid;
    this.scrollToError(form);
  }

  //scrolls to error box
  scrollToError(form: FormGroup): void {
    var controls = form.controls;
    var controlKeys = Object.keys(form.controls);

    for (let value of controlKeys) {
      if (controls[value].errors) {
        var cb = document.getElementsByName(value)[0];
        if (cb != undefined) {
          cb.focus();
        }
        else {
          cb = document.getElementById(value);
          if (cb != undefined) {
            cb.focus();
          }
        }
        break;
      }
    }
  }
}
