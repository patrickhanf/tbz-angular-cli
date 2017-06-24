import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { AddressService } from './geomap.service';

//import { OlService } from './_component/ol/';
//import { OlComponent } from './_component/ol/ol.component';
import { OlService } from '../_component/ol/ol.service';
/// <reference path="openlayers/index.d.ts" />

@Component({
  selector: 'app-test',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css'],
  // This is unnecessary when installing MyService within Root NgModule -- http://mean.expert/2016/05/21/angular-2-component-communication/
  // providers: [OlService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value:
  providers: [AddressService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value:  
})

export class GeomapComponent implements OnInit {
  title = 'test works!';
 

  constructor(private olservice: OlService, private addressservice: AddressService) {
    // constructor
  }

  ngOnInit() {
    console.log("test.component.ngOnInit()");
  }

  ngAfterContentInit() {

    console.log("app.component.ngAfterContentInit()");

    //this.title = this.olservice.getTitle(); // 5-30-17 working service object, it has value because we set it within the constructor

    let vector = this.olservice.getVector();
    if (vector == null)
      console.log("app.component.ngAfterContentInit() vector is null");
    else
      console.log("app.component.ngAfterContentInit() vector ready");

    this.olservice.placeMap();

    //  this.olservice.placeMap().then(() => {

    //   this.addressservice.getAPIGeoJsonAddress()
    //   .subscribe(data => this.olservice.addGeoJson(data),
    //     error => console.log(error),
    //     () => { /* empty */ } );

    //   console.log("Map loaded by promise! running then() => ");
    //   //this.olservice.addPolygon([[174.76, -37.18], [176.76, -37.18], [176.76, -38.18], [174.76, -38.18]], 'Hamilton', 'id_hamilton');
    //   this.olservice.addMarker([-77.043386, 38.909635], 'Dupont Circle', 'akl1');
    //   //this.olservice.addMarker([-93.494311, 45.082136], 'My House', 'akl1');
    // });



  }
}
