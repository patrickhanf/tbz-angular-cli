import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // https://github.com/telerik/kendo-angular/issues/454
import { FlexLayoutModule } from '@angular/flex-layout'; //https://github.com/angular/flex-layout/wiki/Integration-with-Angular-CLI 
import 'hammerjs';  // If this is not here you will get error: "Could not find HammerJS. Certain Angular Material components may not work correctly." see readme.md


// http://www.mithunvp.com/angular-material-2-angular-cli-webpack/
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Custom components
import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent } from './not-found.component';
//import { GeomapComponent } from './geomap/geomap.component';
import { HomeComponent } from './home/home.component';
//import { ContactsComponent } from './contacts/contacts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

import { TitleComponent } from './_component/title.component';
import { SearchComponent } from './_component/search/search.component';

import { ExpansionPanelsModule } from './_modules/ng2-expansion-panels.module';

// https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41
import { DialogsService } from './_component/dialogs/dialogs.service';
import { DialogOK, DialogConfirm, DialogSaveTurf } from './_component/dialogs';



import { OlComponent } from './_component/ol/ol.component';
//import { OlService } from './_component/ol/ol.service'; // global
// https://angular.io/docs/ts/latest/guide/router.html

@NgModule({
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // required for form validation
    HttpModule,
   // JsonpModule,
    LoginRoutingModule,
    AppRoutingModule,
    MaterialModule, //.forRoot() removed after upgrade 5-16-17
    ExpansionPanelsModule,

  ],
  declarations: [
    AppComponent,
    DialogOK, DialogConfirm, DialogSaveTurf,
    TitleComponent,
    OlComponent,
  //  GeomapComponent,
    ComposeMessageComponent,
    DashboardComponent,
    HomeComponent,
    ContactsComponent,
    LoginComponent,
    PageNotFoundComponent,
    ContactDetailComponent,
    SearchComponent
  ],
  providers: [ DialogsService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOK, DialogConfirm, DialogSaveTurf] // https://stackoverflow.com/questions/41684114/angular-2-easy-way-to-make-a-confirmation-dialog
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('app.module.ts Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}