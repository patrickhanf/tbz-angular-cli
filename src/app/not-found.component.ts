import { Component } from '@angular/core';

@Component({
  template: `
   <md-card class="login-card">
     <md-card-content>
    <h1>Page Not Found</h1>
    <div><a routerLink="/home" routerLinkActive="active">home</a></div>
     </md-card-content>
    </md-card>`

})
export class PageNotFoundComponent { }