import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {style, state, animate, transition, trigger} from '@angular/core';

import { Component, OnInit, ViewChild } from '@angular/core';

import { ContactVM } from '../_models/contact';
import { ContactsService } from './contacts.service';

//import { OlService } from '../_component/ol/ol.service';
import { OlComponent } from '../_component/ol/ol.component';

//import { Http, Headers, RequestOptions, Response } from '@angular/http';

// Spotify example, good but not 100%
// https://angular-2-training-book.rangle.io/handout/routing/child_routes.html
// http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/
// https://coryrylan.com/blog/angular-2-observable-data-services


@Component({
  // https://stackoverflow.com/questions/36417931/angular-2-ngif-and-css-transition-animation
  animations: [
  trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(500, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(500, style({opacity:0})) 
    ])
  ])
],
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactsService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})

export class ContactsComponent implements OnInit {
  // @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id
  private contacts: Observable<any>;
  direction = 'row';
  // public contacts: ContactVM[];
  
  @ViewChild(OlComponent) _olComponent: OlComponent;
  //constructor(private router: Router, private contactService: ContactsService, private olservice: OlService) {
  constructor(private router: Router, private contactService: ContactsService) {    
    // constructor
    
  }

selectedIndex: number = 0;

changeSelectedIndex(event) {
  this.selectedIndex = event.index;
}

  onSelectContact(contact: ContactVM) {
    // alert('clicked id='+contact.contactId);
    this.router.navigate(['/contact', contact.contactId]); // This route is handled in the  app-routing.module.ts remove when fixed
  }


  ngOnInit() {
    console.log('loading contacts..');
    //this.contacts = this.contactService.getContacts(); // working 4-12-17
  }

  ngAfterContentInit() {

    console.log("contacts.component.ngAfterContentInit()");
 
    let vector = this._olComponent.ols.getVector();
    if (vector == null)
      console.log("contacts.component.ngAfterContentInit() vector is null");
    else
      console.log("contacts.component.ngAfterContentInit() vector ready");

    
    // this.olservice.placeMap().then(() => {
    //   // this.contactService.getAPIContacts()
    //   //   .subscribe(data => this.contacts = data,
    //   //   error => console.log(error),
    //   //   () => this.buildMap());
    // });



  }

  buildMap() {
    console.log('Build Map -- Before clear()');
    var count = 0;
    for (var ii in this.contacts) {

      var item = this.contacts[ii];


      // console.log(this.contacts[ii].firstName);
      // console.log('loop=' + i);

      if (item.latitude == 0 || item.longitude == 0)
        continue;

      count++;

     // this.olservice.addMarker([item.longitude, item.latitude], item.firstName, 'akl1');
    }

    // this.mapComponent.vectorSource.clear();
    //  console.log('Build Map -- After clear()');

    //this.mapComponent.setDataSourceMap(this.contacts);
    console.log('Build Map -- Get all complete total mapped=' + count);
  }

}
