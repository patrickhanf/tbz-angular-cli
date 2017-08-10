import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { HomeComponent } from './Home.component';
// import { homeRoutingModule }  from './home-routing.module';
//import { ContactsModule } from '../contacts/contacts.module';

//import { DashboardComponent } from '../dashboard/dashboard.component';
//import { ContactsComponent } from '../contacts/contacts.component';

@NgModule({
  imports: [
    CommonModule,
    // homeRoutingModule,
 //   ContactsModule//, 
    // MaterialModule.forRoot()
  ],
  declarations: [
  //  DashboardComponent,
    //ContactsComponent

  ],
  providers: []
})
export class HomeModule {

  constructor(router: Router) {
    console.log('home.module.ts Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
