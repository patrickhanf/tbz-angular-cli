import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ViewChild } from '@angular/core';

import { ContactVM } from '../_models/contact';
import { ContactsService } from './contacts.service';

import { OlService } from '../_component/ol/ol.service';

//import { Http, Headers, RequestOptions, Response } from '@angular/http';

// Spotify example, good but not 100%
// https://angular-2-training-book.rangle.io/handout/routing/child_routes.html
// http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/
// https://coryrylan.com/blog/angular-2-observable-data-services


@Component({
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

  constructor(private router: Router, private contactService: ContactsService, private olservice: OlService) {
    // constructor
  }

  // onSearch(event) {
  // }

  onSelectContact(contact: ContactVM) {
    // alert('clicked id='+contact.contactId);
    this.router.navigate(['/contact', contact.contactId]); // This route is handled in the  app-routing.module.ts remove when fixed
  }

  //Contacts: Contact[]; // = [{firstName: "Johnny", lastName: "Rocket"}];

  // constructor(private contactService: ContactsService) { }


  ngOnInit() {
    console.log('loading contacts..');


    //this.contacts = this.contactService.getContacts(); // working 4-12-17

    // http://stackoverflow.com/questions/38850560/call-web-api-controller-using-angular-2

    // this.contactService.getAPIContacts()
    //   .subscribe(data => this.contacts = data,
    //   error => console.log(error),
    //   () => this.buildMap());

    //
    //   this.thedata = this.http.get("./test.data.json").map((response: Response) => response.json());


    // get contacts from secure api end point
    // this.contactService.getContacts()
    //     .subscribe(contacts => {
    //        // this.thedata = contacts;
    //     });
  }

  buildMap() {
    console.log('Build Map -- Before clear()');
    var count=0;
    for (var ii in this.contacts) {

      var item = this.contacts[ii];


      // console.log(this.contacts[ii].firstName);
      // console.log('loop=' + i);

      if (item.latitude == 0 || item.longitude == 0)
        continue;

     count++;

      this.olservice.addMarker([item.longitude, item.latitude], item.firstName, 'akl1');
    }

    // this.mapComponent.vectorSource.clear();
    //  console.log('Build Map -- After clear()');

    //this.mapComponent.setDataSourceMap(this.contacts);
    console.log('Build Map -- Get all complete total mapped='+count);
  }

  ngAfterContentInit() {

    console.log("app.component.ngAfterContentInit()");

    //this.title = this.olservice.getTitle(); // 5-30-17 working service object, it has value because we set it within the constructor

    let vector = this.olservice.getVector();
    if (vector == null)
      console.log("app.component.ngAfterContentInit() vector is null");
    else
      console.log("app.component.ngAfterContentInit() vector ready");

    this.olservice.placeMap().then(() => {

      this.contactService.getAPIContacts()
        .subscribe(data => this.contacts = data,
        error => console.log(error),
        () => this.buildMap());

      console.log("Map loaded by promise! running then() => ");
      //this.olservice.addPolygon([[174.76, -37.18], [176.76, -37.18], [176.76, -38.18], [174.76, -38.18]], 'Hamilton', 'id_hamilton');
      this.olservice.addMarker([-77.043386, 38.909635], 'Dupont Circle', 'akl1');
      //this.olservice.addMarker([-93.494311, 45.082136], 'My House', 'akl1');
    });



  }

}
