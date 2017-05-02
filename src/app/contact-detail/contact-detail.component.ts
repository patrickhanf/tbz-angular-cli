import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

   id: number;
   private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
       //
       // https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
       //
       this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
    });
  }

 ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
