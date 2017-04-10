import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { ContactsService }  from '../contacts/contacts.service';

@Component({
  template: '<h2>Contact Detail</h2>'
})
export class ContactDetailComponent {

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private service: ContactsService
) {}

// ngOnInit() {
//   this.route.params
//     // (+) converts string 'id' to a number
//     .switchMap((params: Params) => this.service.getHero(+params['id']))
//     .subscribe((hero: Hero) => this.hero = hero);
// }

}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/