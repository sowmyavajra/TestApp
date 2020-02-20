import { Component, OnInit } from '@angular/core';
import { Register } from '../common/models';
import { Service } from '../common/service';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  _register: Register = new Register();
  _showUserRequirementsModal:boolean=false;
  _disableLink:boolean=true;
  constructor(private service:Service,private router:Router) { }

  ngOnInit() {    
    debugger;
  }

  OpenRegsterForm(){
this._showUserRequirementsModal=true;
this._disableLink=false;
  }

  Save(form: any): boolean {
if(!form.valid){
this.service.ValidateAllFormFields(form);
return false;
}
return true;
  }
  Register(form: any) {
    debugger;
if(this.Save(form)){
  debugger;
  this._register.Email=this._register.Email.trim();
  this._register.Password=this._register.Password.trim();
  debugger;
  this.service.SaveRegisterDetails(this. _register);
this.router.navigate(["/Login"]);//navigate to login 
}
  }
}
