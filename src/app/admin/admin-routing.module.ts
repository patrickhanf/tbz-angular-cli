import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent }           from './admin.component';
import { DashboardComponent }  from '../dashboard/dashboard.component';
import { ContactsComponent }  from '../contacts/contacts.component';


import { AuthGuard }           from '../auth-guard.service';

// http://stackoverflow.com/questions/34331478/angular2-redirect-to-login-page/38369948#38369948

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'contacts', component: ContactsComponent },
          { path: 'heroes', component: ContactsComponent },
          { path: '', component: ContactsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/