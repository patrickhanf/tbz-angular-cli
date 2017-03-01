import { Component } from '@angular/core';
// https://medium.com/front-end-hacking/getting-started-using-angular-material-2-in-an-angular-2-angular-cli-application-bbeecdf6bfe2#.fa6qj090d
//import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
//comment
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //directives: [MD_BUTTON_DIRECTIVES],
  template: '<button md-raised-button color=’primary’>this is a magical button</button>'
})
export class AppComponent {
  title = 'Trail Blazer go!';
}
