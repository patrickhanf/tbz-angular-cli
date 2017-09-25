// https://embed.plnkr.co/?show=preview

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Router } from '@angular/router';

import { GlobalVariable } from './_global/global';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean = false;
  public token: string;
  //private baseApiUrl = GlobalVariable.BASE_OAUTH_URL;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: Http, private router: Router) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    // this.baseurl = 'http://oneadvocacy.com';
    //this.baseurl = 'http://localhost:8080';
  }

  login(username: string, password: string) {
    // this.isLoggedIn = true; // temp until we get OAuth to run.

    console.log('clicked _login user=' + username + ' pass=' + password);
    let creds = 'grant_type=password&username=' + username + '&password=' + password + "&client_id=" + GlobalVariable.TRAILBLAZER_CLIENTID;

    // alert(creds);
    // add authorization header with jwt token
    let headers = new Headers();
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    // return new Promise((resolve) => {
     
    //alert('Global='+GlobalVariable.BASE_OAUTH_URL);

    return this.http.post( GlobalVariable.BASE_OAUTH_URL , creds, { headers: headers }).map((response: Response) => {
      // login successful if there's a jwt token in the response, status 400 is Invalid username or password.
      if (response.status == 400) {
        this.isLoggedIn = false;
      }
      else {
        let token = response.json() && response.json().access_token;
        let username = 'Fake User'; //response.json() && response.json().userName; // this came from original project PRH
        console.log("OAuth token=" + token);
        if (token !== '') {

          localStorage.setItem('auth_token',  token );
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          console.log('set currentUser logon() = ' + localStorage.getItem('currentUser'));
          // this.userId = data.json().userId;      
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
    console.log('remove currentUser logout()');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth_token');

    this.router.navigate(['./login']);
  }

  refreshtoken(): void {
    
    // TODO: https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2
    // Exmaple URL:
    // https://trailblziq.com/api/token?grant_type=refresh_token&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&refresh_token=REFRESH_TOKEN
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/