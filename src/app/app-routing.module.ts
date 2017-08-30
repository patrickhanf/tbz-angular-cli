import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent } from './not-found.component';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

// import { IsLoggedIn } from './app-routing-resolve';

//import { GeomapComponent } from './geomap/geomap.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
import { HomeComponent } from './home/home.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
import { ContactsComponent } from './contacts/contacts.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
//import { DashboardComponent } from './dashboard/dashboard.component';  // you must declare this in @NgModule of app.module.ts or you'll get an error
import { ContactDetailComponent } from './contact-detail/contact-detail.component'
import { LoginComponent }       from './login/login.component';
// ROuting explained
// https://vsavkin.com/angular-router-declarative-lazy-loading-7071d1f203ee#.qlmrtmbic

const appRoutes: Routes = [
  //{ path: 'world', component: GeomapComponent, canActivate: [AuthGuard] }, // Temp
  { 
    path: 'admin', 
    component: HomeComponent, 
    canActivate: [AuthGuard], 
    data: { title: 'Welcome' },
    // children: [
    //         {
    //             path: 'dashboardx',
    //             component: DashboardComponent
    //         }
    //     ]
  },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'contact/:id', component: ContactDetailComponent, canActivate: [AuthGuard] },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'compose', component: ComposeMessageComponent, canActivate: [AuthGuard] },
  // { path: '',   redirectTo: '/register', pathMatch: 'full' },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }, 
  // { path: '', redirectTo: '/login', pathMatch: 'full', resolve: [IsLoggedIn] },
  //{ path: '', component: LoginComponent, resolve: [IsLoggedIn] }, // default route redirects to login screen
  { path: '**', component: PageNotFoundComponent }
];

// Fix: 404 - File or directory not found.
// https://stackoverflow.com/questions/35284988/angular-2-404-error-occur-when-i-refresh-through-browser/40833154

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { 
        preloadingStrategy: SelectivePreloadingStrategy, 
        useHash: true, 
        enableTracing: true  // <-- debugging purposes only
      },
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