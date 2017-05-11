import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../auth.service'; //used for OAuth bearer token below
import { ContactVM } from '../_models/contact';
import { CONTACTS } from './mock-contacts'
// /// <reference path="Bing/Microsoft.Maps.All.d.ts"/>


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactsService {

  constructor(private http: Http, private auth: AuthService) { 

  }

  getContacts(): ContactVM[] { return CONTACTS; } // working 4-12-17

  //getAPIContacts(): Observable<ContactVM> {
  //getAPIContacts(): Observable<any> {
  //getAPIContacts(): Observable<ContactVM> {
  getAPIContacts(): Observable<any> {

    //var urls = "http://testingdatabase.oneadvocacy.com/api/ContactApi/?firstname=z&lastname=Humphrey";

    var urls = "http://oneadvocacy.com/api/v1/Contact?FirstName=jam&LastName=gibso";


    // http://stackoverflow.com/questions/40188631/retrieve-response-body-as-plain-text-or-xml-in-angularjs-2-http-get-request


    console.log('1 url=' + urls);
    // var text = "";
    // this.http.get(urls)
    //   .map((res: Response) => res.text())
    //   .subscribe(
    //   data => {
    //     text = data;
    //     console.log(text);
    //   });

    //alert(this.auth.token);

    //
    // https://enable-cors.org/server_iis7.html
    //
    // add authorization header with jwt token
    let headers = new Headers({ 
     // 'Access-Control-Allow-Origin': '*',
    //  'Authorization': 'Bearer ' + this.auth.token
    });
    let options = new RequestOptions({ headers: headers });
    // get users from api
    //    return this.http.get('/api/users', options)
    //        .map((response: Response) => response.json());

    // Caching data!!!
    // http://stackoverflow.com/questions/36271899/what-is-the-correct-way-to-share-the-result-of-an-angular-2-http-network-call-in
    // https://plnkr.co/edit/WpDtCkS4gslYwousZlmi?p=preview

    let response = this.http.get(urls, options)
        .map((response: Response) => <any>response.json());
     //   .do(x => console.log(x)); // debug line working. 4-13-17

  console.log("Done loading Hello...");
  return response;

}



}

// var map = new Microsoft.Maps.Map("myMap", {
//   credentials: 'AkkdyItlkFQpIaP6LBafJJtC0GjEllz_nskGlRSpZ5eUPRRE1iMF985ZnZ1ITMZD'
// });

// map.setView({ center: new Microsoft.Maps.Location(0,0),
//   mapTypeId: Microsoft.Maps.MapTypeId.road
// });