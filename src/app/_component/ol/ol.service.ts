// https://stackoverflow.com/questions/40852037/angular2-openlayers3-test-fails-when-map-renders-writing-tests-impossible

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { AuthService } from '../../auth.service'; // used for OAuth bearer token below

import {HttpService} from '../../_services/http.service';

import { GlobalVariable } from '../../_global/global';

import { TurfVM, FeatureVM } from './ol.model.feature';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OlService {

  featureTEST;
  // constructor(private http: Http, private auth: AuthService) {

  //   console.log("ol.service.constructor()");

  // }
    constructor(private http: HttpService) {

    console.log("ol.service.constructor()");

  }

  postAPITurfFeatures(features: FeatureVM[]): Observable<any> {

    //
    // https://stackoverflow.com/questions/34464108/angular2-set-headers-for-every-request/
    // https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
    //

    //let url = GlobalVariable.BASE_API_URL + '/turf';
    console.log('3 host=', window.location.hostname);

    let url = GlobalVariable.BASE_API_URL + 'Turf';
    //let url = 'http://zionsFirstNational.localhost:8080/api/v1/Turf';
    //let url = 'http://localhost:8080/api/v1/Turf';

    console.log('1 url=', url);
    console.log('2 data=', features);

    // add authorization header with jwt token
    // const header = new Headers({
    //   'Content-Type': 'application/json;charset=utf-8',
    //   // 'Content-Type': 'x-www-form-urlencoded',
    //   // 'Access-Control-Allow-Origin': '*',
    //     'Authorization': 'Bearer ' + this.auth.token
    // });
   // const options = new RequestOptions({ headers: header });

    let turf = new TurfVM(features);


    // let body = JSON.stringify(turf); // http.post converts data automatically
    //console.log("URL API=", url);
    //console.log(body);

    // "This observable is cold which means the request won't go out until something subscribes to the observable. aka req.subscribe()"
    //const req = this.http.post(url, body, options);
    const req = this.http.post(url, turf);

    req.map((response) => <any>response);

    return req;

  }

    getAPITurfFeatures(): Observable<any> {

    let url = GlobalVariable.BASE_API_URL + 'Turf';

    return this.http.get(url).map((response) => <any>response);

    //return req;
  }

} // end