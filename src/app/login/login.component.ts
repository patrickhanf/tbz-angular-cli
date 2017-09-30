import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras, ActivatedRoute } from '@angular/router';
import {GoogleAnalyticsEventsService} from "../_services/googleanalyticsevents.service";
//import { AuthenticationService } from '../_auth/authentication.service';
import { AuthService } from '../auth.service';
import { FacebookService } from '../_services/facebook.service';

import { Cookie } from 'ng2-cookies';


import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


//import { Route } from '@angular/router';

// import { LoginService } from './login.service';
import { WorkSpaceVM } from '../_models/workspace';

@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: 'login.component.html',
//providers: [LoginService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})
export class LoginComponent implements OnInit {

  public showWorkSpaceLogin=false;
  public showWorkSpaceToggle=false;
  public workspace: WorkSpaceVM;
  workspaceSubdomain: string;
  workspaceCookieName: string;

  message: string;
  workspaceUrl: string;
  facebook;
  loading = false;
  model: any = { username: 'TEST', password: 'TEST123' , workspace: '' }; // , committeename: '', workspaceurl: ''};

  loginResult: any;

  constructor(public authService: AuthService, public googleAnalyticsEventsService: GoogleAnalyticsEventsService, public router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any) {
    this.setMessage();
    //
    // to debug use: ng serve --host 0.0.0.0 --disable-host-check
    //
    console.log('host=', window.location.hostname);

    // this.workspaceCookieName = Cookie.get('workspace');

    this.workspaceSubdomain = window.location.hostname.split('.')[0];

    // if(this.workspaceCookieName  === null) {
    //   this.showWorkSpaceToggle = false;
    // }

    console.log('this.workspaceSubdomain= ' + this.workspaceSubdomain + ' this.workspaceCookieName='+this.workspaceCookieName);

    if (this.workspaceSubdomain == "www" || this.workspaceSubdomain == "trailblazeriq" ||  this.workspaceSubdomain == "localhost" ) {
      this.model.workspace = '';
    }
    else {
      this.model.workspace = this.workspaceSubdomain; // prefill what ever subdomain they filled into the URL
    } 

    // 
    // Add GoogleAnalyticsEventsService
    //
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

    //
    // Pre-load API call to get data from server.
    //
    this.route.data.subscribe(
      response  => {
      alert('result= ' + response );
      this.workspace = <WorkSpaceVM> response ["data"];
      //console.log('this.workspace =', this.workspace );
      // No cookie workspace found
      if (this.workspace === null) {  
        //alert('this.workspace === null');
        
        this.showWorkSpaceLogin = false;
        this.showWorkSpaceToggle = false;
   
      }
      else {

        if (this.workspace.workspaceName === this.workspaceSubdomain) {
          this.showWorkSpaceLogin = true;
          this.showWorkSpaceToggle = false;
        }
        else {
          this.showWorkSpaceLogin = false;
          this.showWorkSpaceToggle = true;
        }

        //this.model.workspace = this.workspace.workspaceName;
        //this.model.workspaceurl = this.workspace.workspaceUrl;
        //this.model.committeename = this.workspace.committeeName;
        console.log('data=',this.workspace.workspaceName);
      }
    }, 
    error => {
       alert(error);
    });
   
  }
  ngOnInit() {

    //
    // Pre-load API call to get data from server.
    //
    // this.route.data.subscribe(
    //   response  => {
    //   console.log('result= ', response );
    //   this.workspace = <WorkSpaceVM> response ["data"];
    //   console.log('this.workspace =', this.workspace );
    //   // No cookie workspace found
    //   if (this.workspace === null || this.workspace === undefined ) {  
    //     //alert('this.workspace === null');
        
    //     this.showWorkSpaceLogin = false;
    //     this.showWorkSpaceToggle = false;
   
    //   }
    //   else {

    //     if (this.workspace.workspaceName === this.workspaceSubdomain) {
    //       this.showWorkSpaceLogin = true;
    //       this.showWorkSpaceToggle = false;
    //     }
    //     else {
    //       this.showWorkSpaceLogin = false;
    //       this.showWorkSpaceToggle = true;
    //     }

    //     //this.model.workspace = this.workspace.workspaceName;
    //     //this.model.workspaceurl = this.workspace.workspaceUrl;
    //     //this.model.committeename = this.workspace.committeeName;
    //     console.log('data=',this.workspace.workspaceName);
    //   }
    // }, 
    // error => {
    //    alert(error);
    // });

    // reset login status
    // this.authService.logout(); //Not sure we want to automatically logout when the page loads?
   
    // let name  = this.getWorkSpaceFromCookie();

    // this.loginService.getAPIWorkSpace(name)
    // .subscribe(data => {
    //   this.workspace = data
    //   this.model.workspace = this.workspace.workspaceName;
    // },
    // error => {console.log(error)},
    // () => {
    //   console.log('Get getAPIContactById complete')
      
    // });

    // get return url from route parameters or default to '/'
    // TODO: this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
    // this.returnUrl = '/';
    // this.facebook = new FacebookService();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  loginFacebook(valid) {

    if (!valid)
      return;
    alert("facebook login");
   this.facebook.login();
   this.facebook.viewStatus();
  }
  logoutFacebook(valid) {

    alert("facebook logout");
   this.facebook.logout();
   this.facebook.viewStatus();
  }

  login(valid) {

    if (!valid)
      return;

    this.loading = true;
    // NEW http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
    this.message = 'Trying to log in ...';

    this.authService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.loginResult = data;
        //console.log(this.loginResult);
        this.loading = false;
        this.setMessage();
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'admin/dashboard';

          // Set our navigation extras object
          // that passes on our global query params and fragment
          // let navigationExtras: NavigationExtras = {
          //   preserveQueryParams: true,
          //   preserveFragment: true
          // };
          let navigationExtras: NavigationExtras = {
            queryParamsHandling: "merge",
            preserveFragment: true
          };
          // alert('this.authService.isLoggedIn= '+this.authService.isLoggedIn);
          // Redirect the user
          //console.log('login.component.ts redirect=' + redirect);
         
          this.router.navigate([redirect], navigationExtras);
         
        }

      },
      error => {
        //console.log("code?", error.status);  // aka 400
        this.message = error._body;
        this.loading = false;
      });
  }


  // , // The 2nd callback handles errors.
  // error => { console.log(error)},
  // () => // The 3rd callback handles the "complete" event.
  // );



  logout() {
    this.authService.logout();
    this.setMessage();
  }

  setWorkSpace() {

    // set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean): void;

   if (window.location.hostname.indexOf("localhost") !== -1)
      Cookie.set('workspace', this.model.workspace, 365);
   else
      Cookie.set('workspace', this.model.workspace, 365, "/", "trailblazeriq.com", false );

   // localStorage.setItem("workspace", this.model.workspace);
  }

  redirectWorkSpace() {
    alert('href=' + this.workspace.workspaceUrl);
    this.document.location.href = this.workspace.workspaceUrl; // 'https://stackoverflow.com';
  }


}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

// THIS IS THE ORIGINAL LOGIN CODE - KEEP UNTIL WE HAVE A NEW WORKING LOGIN

// import { Component } from '@angular/core';
// import { Router, NavigationExtras } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   styleUrls: ['./login.component.css'],
//   template: `
//    <md-card class="login-card">
//    <md-toolbar>
//     LOGIN
//     </md-toolbar>
//      <md-card-content>
//       <p>{{message}}</p>

//      </md-card-content>
//     <md-card-actions>
//       <button md-button md-raised-button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
//       <button md-button md-raised-button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
//     </md-card-actions>
//     </md-card>`
// })
// export class LoginComponent {
//   message: string;

//   constructor(public authService: AuthService, public router: Router) {
//     this.setMessage();
//   }

//   setMessage() {
//     this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
//   }

//   login() {
//     this.message = 'Trying to log in ...';

//     this.authService.login().subscribe(() => {
//       this.setMessage();
//       if (this.authService.isLoggedIn) {
//         // Get the redirect URL from our auth service
//         // If no redirect has been set, use the default
//         let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

//         // Set our navigation extras object
//         // that passes on our global query params and fragment
//         let navigationExtras: NavigationExtras = {
//           preserveQueryParams: true,
//           preserveFragment: true
//         };
//         //alert('this.authService.isLoggedIn= '+this.authService.isLoggedIn);
//         // Redirect the user
//         console.log('login.component.ts redirect=' + redirect);
//         this.router.navigate([redirect], navigationExtras);
//       }
//     });
//   }

//   logout() {
//     this.authService.logout();
//     this.setMessage();
//   }
// }
