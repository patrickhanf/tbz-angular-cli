import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ViewChild } from '@angular/core';

//import { Microsoft } from 'scripts/MicrosoftMaps';

/// <reference path="scripts/MicrosoftMaps/Microsoft.Maps.d.ts" />
/// <reference path="scripts/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

import { ContactVM } from '../_models/contact';
import { ContactsService } from './contacts.service';
import { MapComponent } from '../_component/map.component';


//import { Http, Headers, RequestOptions, Response } from '@angular/http';

// Spotify example, good but not 100%
// https://angular-2-training-book.rangle.io/handout/routing/child_routes.html
// http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/
// https://coryrylan.com/blog/angular-2-observable-data-services


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  // template: 'Hello Contacts.Component.ts',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactsService, MapComponent] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})

export class ContactsComponent implements OnInit {
  @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id
  private contacts: Observable<any>;
     direction = "row";
 // public contacts: ContactVM[];

  constructor(private router: Router, private contactService: ContactsService, private mapComponent: MapComponent) {
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
     this.contactService.getAPIContacts()
     .subscribe(data => this.contacts = data,
        error => console.log(error),
        () => this.buildMap() );
    
    //
    //   this.thedata = this.http.get("./test.data.json").map((response: Response) => response.json());


    // get contacts from secure api end point
    // this.contactService.getContacts()
    //     .subscribe(contacts => {
    //        // this.thedata = contacts;
    //     });
  }

  buildMap()
  {
   this.mapComponent.setDataSourceMap(this.contacts);
console.log('Build Map -- Get all complete');
// for (var i in this.contacts) {

//    var item = this.contacts[i];

//         var feature = new ol.Feature(item);
//         feature.set('url', item.media.m);
//         var coordinate = transform([parseFloat(item.longitude), parseFloat(item.latitude)]);
//         var geometry = new ol.geom.Point(coordinate);
//         feature.setGeometry(geometry);
//         flickrSource.addFeature(feature);
                   
// }
      // this.contactService.forEach(function(item) {
      //   var feature = new ol.Feature(item);
      //   feature.set('url', item.media.m);
      //   var coordinate = transform([parseFloat(item.longitude), parseFloat(item.latitude)]);
      //   var geometry = new ol.geom.Point(coordinate);
      //   feature.setGeometry(geometry);
      //   flickrSource.addFeature(feature);
      // });
  }

}
