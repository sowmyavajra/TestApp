import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberInfoComponent } from './home/member-info/member-info.component';
import { PaymentinfoComponent } from './home/payment/paymentinfo.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "member-info", component: MemberInfoComponent },
  { path: "payment-info", component: PaymentinfoComponent },
  { path: "", component: RegisterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
