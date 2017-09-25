import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LoginResolver } from './login-routing.resolver';


const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent, resolve: { data: LoginResolver } }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    LoginService,
    LoginResolver
  ]
})
export class LoginRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/