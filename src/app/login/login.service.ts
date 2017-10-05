import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { GlobalVariable } from '../_global/global';
import { AuthService } from '../auth.service'; // used for OAuth bearer token below

import {HttpService} from '../_services/http.service';

    // Caching data!!!
    // http://stackoverflow.com/questions/36271899/what-is-the-correct-way-to-share-the-result-of-an-angular-2-http-network-call-in
    // https://plnkr.co/edit/WpDtCkS4gslYwousZlmi?p=preview

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(private http: HttpService, private auth: AuthService) { }

  getAPIWorkSpace(workpace: string, workspaceCookie: string): Observable<any> {
    
        let urls = GlobalVariable.BASE_API_URL + 'WorkSpace/?wsname=' + workpace + '&wscookie='+ workspaceCookie;
    
        console.log('1 url=' + urls);
        let body;
    
        let responsex = this.http.get(urls)
          .map((response: Response) => responsex = <any> response.json());

          // .do(x => console.log('debug=',x) )
          // .catch((error: any) => {
          //   if (error.status === 0) { 
          //     console.log("Server is down...")
          //   }

          //     return Observable.throw(new Error('Custom:' + error.status));
          // });
          console.log("getAPIWorkSpace()", responsex);
        return responsex;
        
        //console.log("getAPIWorkSpace()", body);

        //return body || {};
    
      }

}
