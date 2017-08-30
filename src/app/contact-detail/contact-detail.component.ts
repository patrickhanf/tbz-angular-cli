import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

import { ContactDetailService } from './contact-detail.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  providers: [ContactDetailService] // this needs to be here or you WILL Error: Unhandled Promise rejection: No provider for ContactsService! ; Zone: angular ; Task: Promise.then ; Value: 
})
export class ContactDetailComponent implements OnInit {
  public contact: Observable<any>;
  // private contact;

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private contactdetailService: ContactDetailService) { }

  ngOnInit() {
    //
    // https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
    //
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.contactdetailService.getAPIContactById(this.id)
        .subscribe(data => this.contact = data,
        error => console.log(error),
        () => console.log('Get getAPIContactById complete'));



    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // https://angular.io/tutorial/toh-pt5
  //   goBack(): void {
  //   this.location.back();
  // }

}
