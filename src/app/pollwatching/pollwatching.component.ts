import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { PollwatchingService } from './pollwatching.service';

@Component({
  selector: 'app-pollwatching',
  templateUrl: './pollwatching.component.html',
  styleUrls: ['./pollwatching.component.css'],
  providers: [PollwatchingService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})
export class PollwatchingComponent implements OnInit {
  public precincts: Observable<any>;

  public selectedPrecinct;

  //private sub: any;

  constructor(private route: ActivatedRoute, private pollwatchingService: PollwatchingService) { }

  ngOnInit() {
    //
    // https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
    //
     this.pollwatchingService.getAPIPrecinct()
        .subscribe(data => this.precincts = data,
        error => console.log(error),
        () => console.log('Get getAPIContactById complete'));

    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //   // In a real app: dispatch action to load the details here.
    //   this.pollwatchingService.getAPIPrecinct(this.id)
    //     .subscribe(data => this.poll = data,
    //     error => console.log(error),
    //     () => console.log('Get getAPIContactById complete'));

    // });
  }

  ngOnDestroy() {
   // this.sub.unsubscribe();
  }

  // https://angular.io/tutorial/toh-pt5
  //   goBack(): void {
  //   this.location.back();
  // }

}
