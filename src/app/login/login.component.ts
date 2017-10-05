import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies'; // Plugin

import { AuthService } from '../auth.service';
import { FacebookService } from '../_services/facebook.service';
import { GoogleAnalyticsEventsService } from "../_services/googleanalyticsevents.service";
import { LoginService } from './login.service';
import { WorkSpaceDisplayVM } from '../_models/workspace';

@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: 'login.component.html',
  //providers: [LoginService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})
export class LoginComponent implements OnInit {

  public showWorkSpaceLogin = false;
  public showWorkSpaceToggle = false;

  public workspacedisplay: WorkSpaceDisplayVM = new WorkSpaceDisplayVM();
  workspaceSubdomain: string;
  workspaceError: boolean;
  workspaceNamePrimary: string;
  message: string;
  facebook;
  loading = false;



  public model: any = { username: 'TEST', password: 'TEST123', workspacex: '' }; // , committeename: '', workspaceurl: ''};

  loginResult: any;

  constructor(public authService: AuthService, public loginService: LoginService, public googleAnalyticsEventsService: GoogleAnalyticsEventsService, public router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any) {
    this.setMessage();
    //
    // to debug use: ng serve --host 0.0.0.0 --disable-host-check
    //
    console.log('host=', window.location.hostname);

    let tempcookie = Cookie.get('workspace'); // this only works on the production SERVER!!!!!


    this.workspaceSubdomain = window.location.hostname.split('.')[0];

    console.log('this.workspaceSubdomain === ' + this.workspaceSubdomain + ' === cookie === ' + tempcookie + ' ===');

    if (this.workspaceSubdomain == "www" || this.workspaceSubdomain == "trailblazeriq" || this.workspaceSubdomain == "localhost") {
      this.workspacedisplay.primary.workspaceName = '';
    }
    else {
      this.workspacedisplay.primary.workspaceName = this.workspaceSubdomain; // prefill what ever subdomain they filled into the URL
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
      response => {
        
        // TODO: see line 209 for NEW subscribe code
        console.log('route.data.subscribe().response= ', response );

        this.workspacedisplay = <WorkSpaceDisplayVM>response["data"];
        console.log('this.route.data.subscribe().workspace =', this.workspacedisplay);
        // No valid subdomain workspace found
        if (this.workspacedisplay === null) {

          this.showWorkSpaceLogin = false;
          this.showWorkSpaceToggle = false;

        }
        else {

          if (this.workspacedisplay.primary.workspaceName === this.workspaceSubdomain) {
            this.showWorkSpaceLogin = true;
            this.showWorkSpaceToggle = false;
          }
          else {
            this.showWorkSpaceLogin = false;

            // Need to know if a cookie exists befor show this box
            this.showWorkSpaceToggle = this.workspacedisplay.alternative.userDisplay;
          }


          // console.log('data=',this.workspacedisplay.primary.workspaceName);
        }
      },
      error => {
        alert(error);
      });

  }
  ngOnInit() {

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

          //let workspaceSubdomain = window.location.hostname.split('.')[0];
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

  submitPrimary() {

    // set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean): void;
    console.log('this.workspacedisplay.primary.workspaceName=', this.workspaceNamePrimary);

    let tempcookie = Cookie.get('workspace'); // this only works on the production SERVER!!!!!

    this.loginService.getAPIWorkSpace(this.workspaceNamePrimary, tempcookie)
      .subscribe(
      // The 1st callback handles the data emitted by the observable.
      // In your case, it's the JSON data extracted from the response.
      // That's where you'll find your total property.
      (data) => {
        this.workspacedisplay = data;
        // console.log('authService.login() setting cookie=',this.model.workspacex);  
      },
      // The 2nd callback handles errors.
      (err) => console.error(err),
      // The 3rd callback handles the "complete" event.
      () => {
        console.log("observable complete");

        this.setWorkSpaceCookie().subscribe(r => {
          this.redirectWorkSpace(this.workspacedisplay.primary.workspaceUrl, this.workspacedisplay.primary.userDisplay);
        });



      });

    // console.log('this.workspace=',this.workspace);

  }

  submitAlternative() {

    this.redirectWorkSpace(this.workspacedisplay.alternative.workspaceUrl, this.workspacedisplay.alternative.userDisplay);
  }


  redirectWorkSpace(url, valid) {

    if (!valid) {
      this.workspaceError = true;
      //alert('Invalid workspace to Redirect=' + this.workspace.workspaceUrl);
    }
    else {
      this.document.location.href = url; // 'https://stackoverflow.com';
    }

  }

  setWorkSpaceCookie(): Observable<any> {

    if (window.location.hostname.indexOf("localhost") !== -1)
      Cookie.set('workspace', this.workspacedisplay.primary.workspaceName, 365);
    else
      Cookie.set('workspace', this.workspacedisplay.primary.workspaceName, 365, "/", "trailblazeriq.com", false);

   // alert('hot cookies! ' + this.workspacedisplay.primary.workspaceName);
    return Observable.of({});

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
