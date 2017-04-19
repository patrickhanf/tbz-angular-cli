//
// http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial#auth-guard-ts
//
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthenticationService {
    public isLoggedIn: boolean = false;
    public token: string;
    public baseurl: string;

    // constructor(private http: Http) {
    //     // set token if saved in local storage
    //     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     this.token = currentUser && currentUser.token;
    //     this.baseurl = "http://oneadvocacy.com";
    // }

    // login(username: string, password: string): Observable<boolean> {
    //     return this.http.post(this.baseurl + '/token', JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let token = response.json() && response.json().token;
    //             if (token) {
    //                 // set token property
    //                 this.token = token;

    //                 // store username and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

    //                 // return true to indicate successful login
    //                 return true;
    //             } else {
    //                 // return false to indicate failed login
    //                 return false;
    //             }
    //         });
    // }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}

// import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';

// @Injectable()
// export class AuthService {
//   isLoggedIn: boolean = false;

//   // store the URL so we can redirect after logging in
//   redirectUrl: string;

//   login(): Observable<boolean> {
//     return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
//   }

//   logout(): void {
//     this.isLoggedIn = false;
//   }
// }
