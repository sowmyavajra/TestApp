import { Component, OnInit } from '@angular/core';
import { Login } from '../common/models';
import { Router } from '@angular/router';
import { Service } from '../common/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _loading = false;
  _login = new Login();
  _errorDetails: Array<string>;
  constructor(private router: Router, private service: Service
  ) { }

  ngOnInit() {
  }
  Save(form: any): boolean {
    if (!form.valid) {
     this.service.ValidateAllFormFields(form);
      // this._displayError = true;
      this._loading = false;
      return false;

    }
    return true;
  }
  SecureLogin(from: any) {
    if (this.Save(from)) {
      debugger;
      this._loading = true;
      this.router.navigate(['/member-info']);
    }
  }
}
