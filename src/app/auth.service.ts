// https://embed.plnkr.co/?show=preview

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  public isLoggedIn: boolean = false;
  public token: string;
  public baseurl: string;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.baseurl = "http://oneadvocacy.com";
  }

  login(username: string, password: string) {
    //      this.isLoggedIn = true; // temp until we get OAuth to run.

    console.log('clicked _login user=' + username + " pass=" + password);
    var creds = "grant_type=password&username=" + username + "&password=" + password;

    // add authorization header with jwt token
    var headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    //return new Promise((resolve) => {
    return this.http.post(this.baseurl + '/token', creds, { headers: headers }).map((response: Response) => {
      // login successful if there's a jwt token in the response, status 400 is Invalid username or password.
      if (response.status == 400) {
        this.isLoggedIn = false;
      }
      else {
        let token = response.json() && response.json().access_token;
        let username = 'Fake User'; //response.json() && response.json().userName; // this came from original project PRH
        console.log("OAuth token=" + token);
        if (token !== '') {

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          //  this.userId = data.json().userId;      
          this.isLoggedIn = true;
        }

      }
    }
    );

  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.isLoggedIn = false;
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/