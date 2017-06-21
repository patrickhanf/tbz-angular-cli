import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent } from './not-found.component';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';


import { GeomapComponent } from './geomap/geomap.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
import { HomeComponent } from './home/home.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
import { ContactsComponent } from './contacts/contacts.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
import { DashboardComponent } from './dashboard/dashboard.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
import { ContactDetailComponent } from './contact-detail/contact-detail.component'
// import { LoginComponent }       from './login/login.component';
// ROuting explained
// https://vsavkin.com/angular-router-declarative-lazy-loading-7071d1f203ee#.qlmrtmbic

const appRoutes: Routes = [
  { path: 'world', component: GeomapComponent, canActivate: [AuthGuard] }, // Temp
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'contact/:id', component: ContactDetailComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'compose', component: ComposeMessageComponent },
  // { path: '',   redirectTo: '/register', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent }, // default route redirects to login screen
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
