import { Injectable, DebugElement } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Login, Register, FormDataModel,BillingAddress } from './models';
import { ApiService } from './apiservice';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
export class Service {
  private _formData:FormDataModel=new FormDataModel();
   constructor(private apiService: ApiService,private datePipe :DatePipe){}
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
  //Check if date is valid
  IsDateValid(value): boolean {
    let date = new Date(value);
    if (date.toString() != "Invalid Date") {
      let formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      return value == formattedDate;
    }
    return false;
  }
  //Login API call.
  async Login(data:Login) {
    console.log("Querying");
    debugger;
    var result= this.apiService.post("http://localhost:57777/identity/login", data); 
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
  SaveRegisterDetails(data:Register){
    debugger;
this._formData.Register=data;
  }
  GetRegisterDetails(){
    return this._formData.Register;
  }

  //Billng aaddress API call
  //ForgotUserName API call.
  async BillningAddress(data: BillingAddress) {
    let BillningAddressObject = Object.assign({}, data);
    // forgotUserNameObject.DOB = forgotUserNameObject.DateDOBForAPIConverted;
    console.log("Querying");
    //return this.apiService.post(ConfigurationManagerService.settings.BaseURL + ConfigurationManagerService.settings.ForgotUserNameURL, forgotUserNameObject);
    return this.apiService.post("http://localhost:57777/identity/login", BillningAddressObject);
  }
  // On Tab press of last element in modal, focus to 1st element provided in id parameter.
  FocusToFirstElementInModal(event: Event, id: string) {
    event.preventDefault();
    var el = document.getElementById(id);
    el.focus();
  }
}
