import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import { PollwatchingService } from './pollwatching.service';

import 'rxjs/add/operator/debounceTime';



@Component({
  selector: 'app-pollwatching',
  templateUrl: './pollwatching.component.html',
  styleUrls: ['./pollwatching.component.css'],
  providers: [PollwatchingService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})
export class PollwatchingComponent implements OnInit {
  public precincts: Observable<any>;
  public precinctVoters: Observable<any>;
  //public searchFilter: Observable<any>;

  public search = "";
 public searchName: Observable<any>;
 public searchNameControl = new FormControl();

  public selectedPrecinctId;

  //private sub: any;

  constructor(private route: ActivatedRoute, private pollwatchingService: PollwatchingService) { }

  ngOnInit() {

// debounce keystroke events
    this.searchNameControl.valueChanges
      .debounceTime(250)
      .subscribe(newValue => this.searchName = newValue);

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

 getAPIPrecinctVoters(precinctId) {
       //alert(precinctId);
       this.pollwatchingService.getAPIPrecinctVoters(precinctId)
        .subscribe(data => this.precinctVoters = data,
        error => console.log(error),
        () => console.log('Get getAPIContactById complete'));
 }

  // https://angular.io/tutorial/toh-pt5
  //   goBack(): void {
  //   this.location.back();
  // }

}


