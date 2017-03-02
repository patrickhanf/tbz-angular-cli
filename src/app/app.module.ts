import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
// http://www.mithunvp.com/angular-material-2-angular-cli-webpack/
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule }        from './app-routing.module';
// Custom components
import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent }   from './not-found.component';
//import { AdminComponent } from './admin/admin.component';
import { LoginRoutingModule }      from './login/login-routing.module';
import { LoginComponent }          from './login/login.component';
//import { DashboardComponent }          from './dashboard/dashboard.component';
//import { DashboardComponent } from './dashboard/dashboard.component';

// https://angular.io/docs/ts/latest/guide/router.html

@NgModule({
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    //AdminComponent,
    LoginComponent,
    PageNotFoundComponent//,
    //DashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}