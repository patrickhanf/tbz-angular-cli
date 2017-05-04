import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs/Observable';
import {MdGridListModule} from '@angular/material';

//import { SelectivePreloadingStrategy } from '../selective-preloading-strategy';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//sessionId: Observable<string>;
  //token: Observable<string>;
 // modules: string[];

  constructor(
    private route: ActivatedRoute//,
    //private preloadStrategy: SelectivePreloadingStrategy
  ) {
    //this.modules = preloadStrategy.preloadedModules;
  }

  ngOnInit() {
  //   // Capture the session ID if available
  //   this.sessionId = this.route
  //     .queryParams
  //     .map(params => params['session_id'] || 'None');

  //   // Capture the fragment if available
  //   this.token = this.route
  //     .fragment
  //     .map(fragment => fragment || 'None');
   }

}

export class GridListDynamicExample {
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}