import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { PollwatchingComponent } from '../pollwatching/pollwatching.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth-guard.service';
import { SelectivePreloadingStrategy } from '../selective-preloading-strategy';

// http://stackoverflow.com/questions/34331478/angular2-redirect-to-login-page/38369948#38369948

const homeRoutes: Routes = [
{
    path: "admin",
    component : HomeComponent,
    children : [
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard], data: { title: 'Contact Map' } },
    { path: 'contact/:id', component: ContactDetailComponent, canActivate: [AuthGuard], data: { title: 'Contact Record' }  },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'Dashboard' }  },
    { path: 'pollwatching', component: PollwatchingComponent, canActivate: [AuthGuard], data: { title: 'Poll Watching' }  },

    { path: '**', component: DashboardComponent, canActivate: [AuthGuard]}
    
    ]
}
];

// const appRoutes: Routes = [
//   {
//     path: 'compose',
//     component: ComposeMessageComponent,
//     outlet: 'popup'
//   },
//   {
//     path: 'home',
//     loadChildren: 'app/home/home.module#homeModule',
//     canLoad: [AuthGuard]
//   },
//   // {
//   //   path: 'contacts', component: ContactsComponent
//   // },
//   //{ path: 'dashboard',   redirectTo: '/dashboard', pathMatch: 'full' },
//    {
//      path: 'contacts',
//      loadChildren: 'app/contacts/contacts.module#ContactsModule'  //lazy loading this will only download the .js when load when called
//    },
//   { path: '',   redirectTo: '/login', pathMatch: 'full' }, // default route 
//   { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  imports: [
    RouterModule.forChild( homeRoutes )
  ],
    exports: [
        RouterModule
    ],
   providers: [
    SelectivePreloadingStrategy
  ]
})
export class HomeRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/