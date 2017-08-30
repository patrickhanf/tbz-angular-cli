import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth.service'; // used for OAuth bearer token below   
import { ObservableMedia } from "@angular/flex-layout"; // https://stackoverflow.com/questions/42418280/switch-md-sidenav-mode-angular-material-2

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

// http://www.mithunvp.com/angular-material-2-angular-cli-webpack/
// https://www.sitepoint.com/angular-2-tutorial/
// https://medium.com/front-end-hacking/getting-started-using-angular-material-2-in-an-angular-2-angular-cli-application-bbeecdf6bfe2#.fa6qj090d
// comment

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Trail Blazer';
  @ViewChild('wrapper')
  private wrapperElement: ElementRef;

  private menuMode; // Where we'll store the resulting menu mode

  public isAuthorized; // Where we'll store the resulting menu mode

  constructor(public auth: AuthService, public media:ObservableMedia ) {
    // constructor
  }

  ngOnInit(): void {
    //this.isAuthorized = this.auth.isLoggedIn;

    // this.auth.isLoggedIn.subscribe(event => console.log (event) );


    // We are using media queries instead of solution below
    // https://stackoverflow.com/questions/42418280/switch-md-sidenav-mode-angular-material-2
    // 
    // Do your simple test on the container, for example
    // if (this.wrapperElement.nativeElement.offsetWidth <= 720) {
    //   this.menuMode = "over";
    // } else {
    //   this.menuMode = "side";
    // }

  }

  Logout() {
    //console.log('logging out');
    this.auth.logout();
    //this.auth.isLoggedIn

  }

}
