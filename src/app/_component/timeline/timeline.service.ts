import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TimelineService {


    public foo: string;

    constructor() {
    this.foo="bar";
    }

}