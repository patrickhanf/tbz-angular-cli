import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';

import { ContactsService } from './contacts.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

contacts: Contact[]; // = [{firstName: "Johnny", lastName: "Rocket"}];
 
    constructor(private contactService: ContactsService) { }
 
    ngOnInit() {
        console.log('loading contacts..');
        // get contacts from secure api end point
        this.contactService.getContacts()
            .subscribe(contacts => {
                this.contacts = contacts;
            });
    }

}
