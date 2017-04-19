import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs/Observable';

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
