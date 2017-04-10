import { Component }        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService }      from '../auth.service';

@Component({
  styleUrls: ['./login.component.css'],
  template: `
   <md-card class="login-card">
   <md-toolbar>
    LOGIN
    </md-toolbar>
     <md-card-content>
    <p>{{message}}</p>
     </md-card-content>
    <md-card-actions>
      <button md-button md-raised-button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
      <button md-button md-raised-button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
    </md-card-actions>
    <md-card>`
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };
        //alert('this.authService.isLoggedIn= '+this.authService.isLoggedIn);
        // Redirect the user
        console.log('login.component.ts redirect='+redirect);
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/