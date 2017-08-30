import { Component, OnInit } from '@angular/core';
import { Router, Route } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { MdGridListModule } from '@angular/material';

//import { SelectivePreloadingStrategy } from '../selective-preloading-strategy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public viewRoutes = []; // https://stackoverflow.com/questions/37569936/how-to-list-output-all-routes-in-routes-in-my-angular2-app

  constructor(private router: Router) { }

  ngOnInit() {
    //   // Capture the session ID if available
    //   this.sessionId = this.route
    //     .queryParams
    //     .map(params => params['session_id'] || 'None');

      this.printpath('', this.router.config);
  }

   printpath(parent: String, config: Route[]) {
    for (let i = 0; i < config.length; i++) {
      let r = config[i];
     // console.log(parent + '/' + r.path);
      let url = parent + '/' + r.path;

      this.viewRoutes.push(url);

      if (r.children && r.path) {
        this.printpath(parent + '/' + r.path, r.children);
      }
    }
  }

}

export class GridListDynamicExample {
  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
}