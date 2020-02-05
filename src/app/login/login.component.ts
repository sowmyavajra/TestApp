import { Component, OnInit } from '@angular/core';
import { Login } from '../common/models';
import { Router } from '@angular/router';
import { Service } from '../common/service';
import { AlertifyService } from '../common/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _loading = false;
  _login : Login = new Login();
  _errorDetails: Array<string>=new Array();
  constructor(private router: Router, private service: Service, private alertify: AlertifyService
  ) { }

  ngOnInit() {

  this._login=this.service.GetRegisterDetails();
  }
  Save(form: any): boolean {
    if (!form.valid) {
      this.service.ValidateAllFormFields(form);
      this._loading = false;
      return false;

    }
    return true;
  }
  async SecureLogin(from: any) {
    if (this.Save(from)) {
      debugger;
      this._loading = true;
      this._login.Email = this._login.Email.trim();
      this._login.Password = this._login.Password.trim();
      debugger;
      await this.MemberLogin(this._login);
      this._loading = false;
    }
  }
  async MemberLogin(data: Login) {

    await this.service.Login(data).then(
      success => {
        debugger;
        if (success["Success"] == "false") {
          this.alertify.warning("login failed");
          this._errorDetails.push("Error Occured");
          this._loading = false;
        }
        else if (success["Success"] == "true") {          
          this.alertify.success("login successfull.");
          this.router.navigate(['/payment-info']);
          this._loading = false;
        }
      },
      error => {      
               this.alertify.error(error);
        this._loading = false;
      },
    )
  }

}
