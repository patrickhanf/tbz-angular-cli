import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactsService } from './contacts.service';

// Spotify example, good but not 100%
// http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/

@Component({
  selector: 'app-contacts',
  //templateUrl: './contacts.component.html',
  template: 'Hello Contacts',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

contacts: Contact[]; // = [{firstName: "Johnny", lastName: "Rocket"}];
 
   // constructor(private contactService: ContactsService) { }
 
    ngOnInit() {
        console.log('loading contacts..');

       // this.contacts = [{ firstName: "Johnny", lastName: "Rocket" }, { firstName: "Silver", lastname: "Hi-ho" }];
        

        // get contacts from secure api end point
        // this.contactService.getContacts()
        //     .subscribe(contacts => {
        //         this.contacts = contacts;
        //     });
    }

}
