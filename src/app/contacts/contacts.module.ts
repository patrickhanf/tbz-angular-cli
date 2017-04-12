import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from '../contactdetail/contactdetail.component';

import { ContactsService } from './contacts.service';

//import { ContactsRoutingModule } from './contacts.module.routing';



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
   // ContactsRoutingModule
  ],
  declarations: [
    ContactsComponent,
    ContactDetailComponent
  ],
  providers: [
    ContactsService
  ]
})
export class ContactsModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/