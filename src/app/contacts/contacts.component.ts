import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';
import { ContactVM } from '../_models/contact';
import { ContactsService } from './contacts.service';

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
  providers: [ContactsService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})

export class ContactsComponent implements OnInit {
  private contacts: Observable<any>;
     direction = "row";
 // public contacts: ContactVM[];

  constructor(private router: Router, private contactService: ContactsService) {
    // constructor
  }

  // onSearch(event) {
  // }
 



  onSelectContact(contact: ContactVM) {
      this.router.navigate(['/contact', contact.contactId]);
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
        () => console.log('Get all complete'));

    //   this.thedata = this.http.get("./test.data.json").map((response: Response) => response.json());

    // this.thedata = [{ firstName: "Johnny", lastName: "Rocket" }, { firstName: "Silver", lastname: "Hi-ho" }];


    // get contacts from secure api end point
    // this.contactService.getContacts()
    //     .subscribe(contacts => {
    //        // this.thedata = contacts;
    //     });
  }

}
