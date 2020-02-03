import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
}
)
export class HttpRequestResponseInterceptor implements HttpInterceptor {
  constructor( private router: Router, private route: ActivatedRoute) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authkey': 'qU8T9DezfDVG9zFF9bmlMpF4mFl77mXP1NCZuWIf1oM=',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
    };

    //const token = this.jwtService.GetToken();

    //if (token) {
    //  headersConfig['Authorization'] = `Bearer ${token}`;
    //}
    //let gUID = this.userService.GetUserGUID();
    headersConfig['Referrer'] =  " : API called from Member Portal : " + this.router.url.substring(1) + " component";
debugger;
    const request = req.clone({ setHeaders: headersConfig });
    //let logout = '/logout';
    //let login = '/login';
    ////If logout is called, clear the JWT token and role associated
    //if (request.url.toLowerCase().search(logout) != -1) {
    //  this.PurgeUserCredentials();
    //  console.clear();
    //}
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            //If login is called, add the JWT token and role associated
            //if (request.url.toLowerCase().search(login) != -1) {
            //  this.CreateUserCredentials(event.body.AccessToken, event.body.Role, event.body.FirstName + " " + event.body.LastName, event.body.MemberId, event.body.Status, event.body.PastDue, event.body.IsCancelDue);
            //}
            //else {
            //  if (event.body.AccessToken != undefined) {
            //    this.jwtService.SaveToken(event.body.AccessToken);
            //  }
            //}
           
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (error instanceof HttpErrorResponse) {
            if (error.status == 403 || error.status == 401) {
              //this.PurgeUserCredentials();
              //this.router.navigate(['/Login', { timeout: "true" }]);
              console.clear();
            }
            console.log("api call error :", error);
          }
        }
      )
    );
  }

  //Creates jwt and roles required for authentication
  //CreateUserCredentials(accessToken: string, role: string, fullName: string, memberId: string, status: string, pastDue: string, isCancelDue: string) {
  //  this.jwtService.SaveToken(accessToken);
  //  this.roleService.SaveRole(role);
  //  this.userService.SaveUserFullName(fullName);
  //  this.userService.SaveMemberId(memberId);
  //  this.userService.SaveMemberStatus(status);
  //  this.userService.SavePastDue(pastDue);
  //  this.userService.SaveIsCancelDue(isCancelDue);
  //  this.userService.authenticated = true;
  //  this.userService.role = role;
  //  this.userService.userFullName = fullName;
  //}

  ////Destroys jwt and roles generated for authentication
  //PurgeUserCredentials() {
  //  this.jwtService.DestroyToken();
  //  this.roleService.DestroyRole();
  //  this.userService.DestroyUserFullName();
  //  this.userService.DestroyMemberId();
  //  this.userService.DestroyMemberStatus();
  //  this.userService.DestroyPastDue();
  //  this.userService.DestroyIsCancelDue();
  //  this.userService.authenticated = false;
  //  this.userService.role = undefined;
  //  this.userService.userFullName = "";
  //}
}

