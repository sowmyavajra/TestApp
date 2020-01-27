import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberInfoComponent } from './home/member-info/member-info.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "member-info", component: MemberInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
