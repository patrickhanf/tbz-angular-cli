import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { AuthenticationService } from '../_auth/_authentication.service'; //used for OAuth bearer token below
import { ContactVM } from '../_models/contact';
import { CONTACTS } from './mock-contacts'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactsService {

  constructor(private http: Http) { }

  getContacts(): ContactVM[] { return CONTACTS; } // working 4-12-17

  //getAPIContacts(): Observable<ContactVM> {
  getAPIContacts(): Observable<any[]> {

    //   //     // get users from api
    //   //     // http://testingdatabase.oneadvocacy.com/api/ContactApi/?firstname=pa&lastname=ha
    //   //     // http://testingdatabase.oneadvocacy.com/apis/v1/EventApi
    //   //     //
    //   //     return Observable.create(() => { return this.dummyData })

    //   // test data in video, see 13:15 mins
    //   // https://coursetro.com/posts/code/29/Working-with-Angular-2-Material
    //   //
    var urls = "http://testingdatabase.oneadvocacy.com/api/ContactApi/?firstname=z&lastname=Humphrey";


    // http://stackoverflow.com/questions/40188631/retrieve-response-body-as-plain-text-or-xml-in-angularjs-2-http-get-request


    console.log('1 url=' + urls);
    var text = "";
    this.http.get(urls)
      .map((res: Response) => res.text())
      .subscribe(
      data => {
        text = data;
        console.log(text);
      });

    //
    // https://enable-cors.org/server_iis7.html
    //
    // add authorization header with jwt token
    // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    // let options = new RequestOptions({ headers: headers });
    // get users from api
    //    return this.http.get('/api/users', options)
    //        .map((response: Response) => response.json());
    var summary: any[];
    var c = this.http.get(urls)
      .map((response: Response) => <any[]>response.json())
      .do(data => console.log("Data received: " + JSON.stringify(data))) // debugging 
      .catch(error => {
        console.log(error);
        return Observable.throw(error);
      });

  //console.log(c);
  return c;

  }
}