import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { style, state, animate, transition, trigger } from '@angular/core';
import { FeatureEnums } from '../_global/global.enums';

import { MdSidenav } from '@angular/material';

import { Component, OnInit, ViewChild } from '@angular/core';

import { ContactVM } from '../_models/contact';
import { ContactsService } from './contacts.service';


import { OlComponent } from '../_component/ol/ol.component';



//import { Http, Headers, RequestOptions, Response } from '@angular/http';

// Spotify example, good but not 100%
// https://angular-2-training-book.rangle.io/handout/routing/child_routes.html
// http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/
// https://coryrylan.com/blog/angular-2-observable-data-services


@Component({
  // https://stackoverflow.com/questions/36417931/angular-2-ngif-and-css-transition-animation
  animations: [
    // trigger(
    //   'enterAnimation', [
    //     transition(':enter', [
    //       style({ opacity: 0}),
    //       animate('300ms', style({ opacity: 1}))
    //     ]),
    //     transition(':leave', [
    //       style({ opacity: 1 }),
    //       animate('300ms', style({ opacity: 0}))
    //     ])
    //   ]
    // )
  ],
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactsService], // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 

})

export class ContactsComponent implements OnInit {
  // @ViewChild('myMap') myMap; // using ViewChild to reference the div instead of setting an id
  private contacts: Observable<any>;

  private addressContacts: Observable<any>;

  direction = 'row';
  @ViewChild('sidenav') _sidenav: MdSidenav;
  private menuMode = "over"; // Where we'll store the resulting menu mode
  featureName = '';
  featureId: number;

  // viewaddresspanel:MdSidenav;
  // public contacts: ContactVM[];
  showPanelSearch: boolean = true;
  showPanelAddressDetail: boolean = false;
  showPanelTurfDetail: boolean = false;

  tabLinkActiveIndex = 0;
  tabLinks = [
    { label: 'Map', icon: 'room' },
    { label: 'List', icon: 'view_list' }
  ];

  @ViewChild(OlComponent) _olComponent: OlComponent;

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

  }

  onSubmit(searchVM): void {

    //
    // Update Map layer with search filters.
    //
    this._olComponent.getAPIMapTile(searchVM);
    //
    // Update Contact list within this component
    //

    // this.contactService.getAPIContacts(searchVM)
    //   .subscribe(data => this.contacts = data,
    //   error => console.log(error),
    //   () => this.buildMap());

    console.log(1, searchVM);
  }

  openViewEditPanel(event): void {

    let _feature;

    if (this._olComponent.showTurfActions)
      return;

    if (event.feature == null)
      return;

    _feature = event.feature;

    // console.log("feature Id? ", _feature.get('id'));

   // console.log("Is Open? ", event)

    if (event.open) {

      console.log(_feature.type);

      this.featureName  = _feature.name;
      this.featureId  = _feature.turfId;

      let addressid = Number(_feature.turfId);

      if (_feature.type === FeatureEnums.Turf) {
        this.showPanelSearch = false;
        this.showPanelTurfDetail = true;
        this.showPanelAddressDetail = false;
        this._sidenav.open();
      } else if (_feature.type === FeatureEnums.Address) {

      //this.addressContacts= Observable.empty();
      
      this.contactService.getAPIContactsByAddressid(addressid)
        .subscribe(data => this.addressContacts = data,
        error => console.log(error),
        () => this._sidenav.open() );

          this.showPanelSearch = false;
          this.showPanelTurfDetail = false;
          this.showPanelAddressDetail = true;

      }

      // this.menuMode = "over";
    
    }
    else {
      this._sidenav.close();
    }

  }


  sidenavClose(): void {
    
    this.showPanelSearch = true;
    this.showPanelTurfDetail = false;
    this.showPanelAddressDetail = false;

    console.log("Closed event sidenavClose()");
  }
  // buildMap() {
  //   console.log('Build Map -- Before clear()');
  //   var count = 0;
  //   for (var ii in this.contacts) {

  //     var item = this.contacts[ii];


  //     // console.log(this.contacts[ii].firstName);
  //     // console.log('loop=' + i);

  //     if (item.latitude == 0 || item.longitude == 0)
  //       continue;

  //     count++;

  //     // this.olservice.addMarker([item.longitude, item.latitude], item.firstName, 'akl1');
  //   }

  //   // this.mapComponent.vectorSource.clear();
  //   //  console.log('Build Map -- After clear()');

  //   //this.mapComponent.setDataSourceMap(this.contacts);
  //   console.log('Build Map -- Get all complete total mapped=' + count);
  // }

}
