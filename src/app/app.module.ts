import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // https://github.com/telerik/kendo-angular/issues/454
import { FlexLayoutModule } from '@angular/flex-layout'; //https://github.com/angular/flex-layout/wiki/Integration-with-Angular-CLI 


// http://www.mithunvp.com/angular-material-2-angular-cli-webpack/
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule }        from './app-routing.module';
// Custom components
import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent }   from './not-found.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent }    from './contacts/contacts.component'; 
import { DashboardComponent }    from './dashboard/dashboard.component';
import { LoginRoutingModule }      from './login/login-routing.module';
import { LoginComponent }          from './login/login.component';

// https://angular.io/docs/ts/latest/guide/router.html

@NgModule({
    imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    DashboardComponent,
    HomeComponent,
    ContactsComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
   // console.log('app.module.ts Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}