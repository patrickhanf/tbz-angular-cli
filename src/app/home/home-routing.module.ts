import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { HomeComponent }           from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth-guard.service';

// http://stackoverflow.com/questions/34331478/angular2-redirect-to-login-page/38369948#38369948

const homeRoutes: Routes = [
{
    path: "home",
    component : HomeComponent,
    children : [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] }
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
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class homeRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/