import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'; // used for OAuth bearer token below   
//import { Planets, PlanetsService } from './shared';
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

  //   ngOnInit(): void {
  //      // $('body').addClass("fullscreen");
  //   }

  constructor(private auth: AuthService) {
    // constructor
  }

  Logout() {
    //console.log('logging out');
    this.auth.logout();

  }

}
