
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from '../contacts/contacts.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

import { AuthGuard } from '../auth-guard.service';

//
// Good example of child routes for contacts
//
// https://angular-2-training-book.rangle.io/handout/routing/child_routes.html

// https://angular.io/docs/ts/latest/guide/router.html
// this is following the heros example
const contactsRoutes: Routes = [
    { path: 'contact', component: ContactsComponent },
    { path: 'contact/:id', component: ContactDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(contactsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ContactsRoutingModule { }