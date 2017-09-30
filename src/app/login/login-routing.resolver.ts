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
  resolve( route: ActivatedRouteSnapshot): Observable<WorkSpaceVM>
  {
    let workspaceCookieName = Cookie.get('workspace');

    if (workspaceCookieName === null || workspaceCookieName === undefined || workspaceCookieName === '') {
       return  null; //Observable.throw(new Error('tbz-cookie missing:'));
    }
    else {
       return this.loginService.getAPIWorkSpace(workspaceCookieName);
    }
  }
  
}