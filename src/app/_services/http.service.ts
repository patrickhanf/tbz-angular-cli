//
// See title: "Create a custom Http class by extending the Angular 2 Http"
// https://stackoverflow.com/questions/34464108/angular2-set-headers-for-every-request/
//
//   createAuthorizationBasicHeader(headers: Headers) {
//     headers.append('Authorization', 'Basic ' + btoa('username:password')); 
//   }

//   createAuthorizationBearerHeader(headers: Headers) {
//     headers.append('Content-Type', 'application/json;charset=utf-8'); 
//     headers.append('Authorization', 'Bearer ' + this.auth.token); 
//   }
// constructor(protected _backend: ConnectionBackend, protected _defaultOptions: RequestOptions, private auth: AuthService) {
   
import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService extends Http {


    constructor( backend: XHRBackend, options: RequestOptions) {
        
        let token = localStorage.getItem('auth_token'); // your custom token getter function here

        if(token !== null){
          console.log('http.service.ts.constructor() token=' + token);
           options.headers.set('Authorization', `Bearer ${token}`);
        }
    

        super(backend, options);
      
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {

        let token = localStorage.getItem('auth_token');

        if(token === null){
            console.log('http.service.ts token=' + token);
            return super.request(url, options).catch(this.catchAuthError(this));
         }

        if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
            if (!options) {
                // let's make option object
                options = { headers: new Headers() };
            }
            options.headers.set('Authorization', `Bearer ${token}`);
        } else {
            // we have to add the token to the url object
            url.headers.set('Authorization', `Bearer ${token}`);
        }
        return super.request(url, options).catch(this.catchAuthError(this));

    }

    private catchAuthError(self: HttpService) {
        // we have to pass HttpService's own instance here as `self`
        return (err: Response) => {
            console.log('http.service.ts/catchAuthError()', err);

            if (err.status === 0) { 
                console.log("Server is down...", err)
               // return Observable.throw(new Error('tbz-Server-is-down:' + res.status));
            }

            if (err.status === 401 || err.status === 403) {
                // if not authenticated
                console.log("Server Auth failed...", err);
            }
           return  Observable.throw(err); // this will bubble the event up
        //    return Observable.of(err);
        };
    }

}