import { Injectable, DebugElement } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Login } from './models';
import { ApiService } from './apiservice';

@Injectable({
    providedIn: 'root'
  })
export class Service {
   constructor(private apiService: ApiService){}
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
  //Login API call.
  async Login(data:Login) {
    console.log("Querying");
    debugger;
    var result= this.apiService.post("http://cloudtech51/localhost:57777/identity/login", data); 
    debugger;
    console.log(result);
    return result;
  }
  GetToken(): string {
    return window.localStorage['jwtToken'];
  }
  SaveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  DestroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
  SaveUserFullName(userFullName: string) {
    window.localStorage['UserFullName'] = userFullName;
  }
}
