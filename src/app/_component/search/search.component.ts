import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from './search.service';
import { SearchVM } from './search.model';



@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    outputs: ['myevent'], // https://www.sitepoint.com/angular-2-components-inputs-outputs/
    providers: [SearchService] // http://developer.telerik.com/topics/web-development/creating-angular-2-injectable-service/
})
export class SearchComponent implements OnInit {

 // outputs


    @Output() private onSubmitFilter: EventEmitter<SearchVM> = new EventEmitter();

    @Input() lnglat: [number, number];
    @Input() zoom: number;

    donationmin: number;
    donationmax: number;
    step: number;

    searchModel = new SearchVM();

    constructor(private olService : SearchService ) {
    //this.searchModel.contact.firstName = "Patrick";
    
    //https://www.google.com/search?q=hex+color+picker&rlz=1C1CHBF_enUS715US715&oq=hex+color&aqs=chrome.1.69i57j0l5.2119j0j8&sourceid=chrome&ie=UTF-8
    this.searchModel.address.hexColor = '#00ccff';  
    }



    ngOnInit() {
    console.log("search.component.ngOnInit()");
    }

    ngAfterContentInit() {
    
        console.log("search.component.ngAfterContentInit()");

    }

    
    /**
     * @name submit
     */
    searchFilter() {
    //  SOURCE: https://www.themarketingtechnologist.co/building-nested-components-in-angular-2/
    //  TODO:  <app-search (onSubmitFilter)='onSubmit($event)'></app-search>
    //
        this.onSubmitFilter.emit(this.searchModel);
    }

    /**
     * @name resubmit
     */
    resetFilter() {
    //  SOURCE: https://www.themarketingtechnologist.co/building-nested-components-in-angular-2/
    //  TODO:  <app-search (onSubmitFilter)='onSubmit($event)'></app-search>
    //
    this.searchModel = new SearchVM();
    }

}