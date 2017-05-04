import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { AuthenticationService } from '../_auth/_authentication.service'; //used for OAuth bearer token below
//import { ContactVM } from '../_models/contact';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactDetailService {

  constructor(private http: Http) { }

  getAPIContactById(contactid: number): Observable<any> {

    var urls = "http://oneadvocacy.com/api/v1/Contact/"+contactid;

    console.log('1 url=' + urls);

    // Caching data!!!
    // http://stackoverflow.com/questions/36271899/what-is-the-correct-way-to-share-the-result-of-an-angular-2-http-network-call-in
    // https://plnkr.co/edit/WpDtCkS4gslYwousZlmi?p=preview

    let response = this.http.get(urls)
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