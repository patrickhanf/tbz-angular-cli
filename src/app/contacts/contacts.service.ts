import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
//import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { AuthenticationService } from '../_auth/_authentication.service'; //used for OAuth bearer token below
import { Contact } from '../_models/contact';
import { CONTACTS } from './mock-contacts'

@Injectable()
export class ContactsService {

  //constructor(private http: Http) { }

    getContacts(): Contact[] {

    return CONTACTS;

  //   //     // get users from api
  //   //     // http://testingdatabase.oneadvocacy.com/api/ContactApi/?firstname=pa&lastname=ha
  //   //     // http://testingdatabase.oneadvocacy.com/apis/v1/EventApi
  //   //     //
  //   //     return Observable.create(() => { return this.dummyData })

  //   // test data in video, see 13:15 mins
  //   // https://coursetro.com/posts/code/29/Working-with-Angular-2-Material
  //   //
  //   //var urls = "http://testingdatabase.oneadvocacy.com/api/ContactApi/?firstname=pa&lastname=ha"

   //  return this.http.get("./test.data.json").map((response: Response) => response.json());

  //   //     // add authorization header with jwt token
  //   //     // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
  //   //     // let options = new RequestOptions({ headers: headers });

  //   //     // // get users from api
  //   //     // return this.http.get('/api/users', options)
  //   //     //     .map((response: Response) => response.json());
   }
}