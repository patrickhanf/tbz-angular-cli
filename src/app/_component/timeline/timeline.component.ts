// https://webdesign.tutsplus.com/tutorials/building-a-vertical-timeline-with-css-and-a-touch-of-javascript--cms-26528

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineService } from './timeline.service';
import { TimelineVM } from './timeline.model';
import { LogVM } from '../../_models/attribute';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css'],
    outputs: ['myevent'], // https://www.sitepoint.com/angular-2-components-inputs-outputs/
    providers: [TimelineService] // http://developer.telerik.com/topics/web-development/creating-angular-2-injectable-service/
})
export class TimelineComponent implements OnInit {

    @Output() private onClickTimeline: EventEmitter<TimelineVM> = new EventEmitter();

    @Input() timeline: LogVM[];

    //public logs: LogVM[];
    
    constructor(private olService : TimelineService ) {
    //this.searchModel.contact.firstName = "Patrick";
    
    //https://www.google.com/search?q=hex+color+picker&rlz=1C1CHBF_enUS715US715&oq=hex+color&aqs=chrome.1.69i57j0l5.2119j0j8&sourceid=chrome&ie=UTF-8
     
    }

    ngOnInit() {
    console.log("timeline.component.ngOnInit()");
    }

    ngAfterContentInit() {
        console.log("timeline.component.ngAfterContentInit()");
    }
    
    /**
     * @name submit
     */
    clickedTimeline() {
    //  SOURCE: https://www.themarketingtechnologist.co/building-nested-components-in-angular-2/
    //  TODO:  <app-search (onSubmitFilter)='onSubmit($event)'></app-search>
    //
      //  this.onClickTimeline.emit(this.timeline);
    }


}