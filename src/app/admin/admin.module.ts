import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AdminComponent }           from './admin.component';
import { DashboardComponent }  from '../dashboard/dashboard.component';
import { ContactsComponent }  from '../contacts/contacts.component';

import { AdminRoutingModule }       from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ContactsComponent
  ]
})
export class AdminModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/