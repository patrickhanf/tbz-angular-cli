import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';
import { WorkSpaceVM } from '../_models/workspace';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class LoginResolver implements Resolve<any> {
  constructor(private loginService: LoginService) {}

  //resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any 
  resolve( route: ActivatedRouteSnapshot): Observable<any>
  {
    let workspaceCookieName = Cookie.get('workspace');
    let workspaceSubdomain = window.location.hostname.split('.')[0];

    console.log('loginService.workspaceSubdomain='+workspaceSubdomain + ' workspaceCookieName=' + workspaceCookieName);

    if (workspaceSubdomain == "www" || workspaceSubdomain == "trailblazeriq" || workspaceSubdomain == "localhost") {
      workspaceSubdomain = "";
    }


    return this.loginService.getAPIWorkSpace(workspaceSubdomain, workspaceCookieName);
 
  }
  
}