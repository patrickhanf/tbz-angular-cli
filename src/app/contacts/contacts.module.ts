import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
//import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

//import { ContactsComponent } from './contacts.component';
//import { ContactDetailComponent } from '../contactdetail/contactdetail.component';

import { ContactsService } from './contacts.service';

//import { SearchComponent } from '../_component/search/search.component'; //real map

//import { MapComponent } from '../_component/map.component'; //real map
// import { ContactsRoutingModule } from './contacts.module.routing';

import { OlService } from '../_component/ol/ol.service'; // global
//import { OlComponent } from '../_component/ol/ol.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   // CommonModule
    // ContactsRoutingModule
  ],
    declarations: [
   
   // SearchComponent,
 //   OlComponent,
   // MapComponent,
    //  ContactDetailComponent
  ],
  providers: [
    ContactsService,
    OlService
  ]
})
export class ContactsModule {

}