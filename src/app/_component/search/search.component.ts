import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from './search.service';



@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    outputs: ['myevent'], // https://www.sitepoint.com/angular-2-components-inputs-outputs/
    providers: [SearchService] // http://developer.telerik.com/topics/web-development/creating-angular-2-injectable-service/
})
export class SearchComponent implements OnInit {

    @Input() lnglat: [number, number];
    @Input() zoom: number;
    @Output() myevent: EventEmitter<any> = new EventEmitter();

    constructor(private olService : SearchService) {

    }

    ngOnInit() {
    console.log("search.component.ngOnInit()");
    }

    ngAfterContentInit() {
    
        console.log("search.component.ngAfterContentInit()");

    }

}