import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form

import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // https://github.com/telerik/kendo-angular/issues/454
import { FlexLayoutModule } from '@angular/flex-layout'; //https://github.com/angular/flex-layout/wiki/Integration-with-Angular-CLI 
import 'hammerjs';  // If this is not here you will get error: "Could not find HammerJS. Certain Angular Material components may not work correctly." see readme.md
import { MaterialModule } from '@angular/material'; // http://www.mithunvp.com/angular-material-2-angular-cli-webpack/


import { HomeRoutingModule }  from './home-routing.module';
//import { DashboardComponent } from '../dashboard/dashboard.component';


@NgModule({
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // required for form validation
    HttpModule,
    CommonModule,
    HomeRoutingModule,
 //   ContactsModule//, 
    // MaterialModule.forRoot()
  ],
  declarations: [
  //  HomeComponent,
  //  DashboardComponent,
  ],
  providers: []
})
export class HomeModule {

  // constructor(router: Router) {
  //   console.log('home.module.ts Routes: ', JSON.stringify(router.config, undefined, 2));
  // }

}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
