import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../auth.service'; // used for OAuth bearer token below



// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddressService {

  constructor(private http: Http, private auth: AuthService) {

  }

  getAPIGeoJsonAddress(): Observable<any> {

   //let urls = 'http://localhost:8080/api/v1/Contact/Geo?StateName=MN';
     let urls = 'http://geo.localhost:8080/api/v1/Address?CityName=Hopkins&StateName=MN';
   //let urls = 'http://markpanger.mydomain.com:8080/api/v1/Contact/Geo';

    console.log('1 url=' + urls);
    //
    // https://enable-cors.org/server_iis7.html
    //
    // add authorization header with jwt token
    const header = new Headers({
      // 'Access-Control-Allow-Origin': '*',
      //  'Authorization': 'Bearer ' + this.auth.token
    });
    const options = new RequestOptions({ headers: header });
    // get users from api
    //    return this.http.get('/api/users', options)
    //        .map((response: Response) => response.json());

    // Caching data!!!
    // http://stackoverflow.com/questions/36271899/what-is-the-correct-way-to-share-the-result-of-an-angular-2-http-network-call-in
    // https://plnkr.co/edit/WpDtCkS4gslYwousZlmi?p=preview

    const responsex = this.http.get(urls, options)
      .map((response: Response) => <any>response.json());
    //   .do(x => console.log(x)); // debug line working. 4-13-17

    console.log("Done loading Address GeoJson...");
    return responsex;

  }



}

// var map = new Microsoft.Maps.Map("myMap", {
//   credentials: 'AkkdyItlkFQpIaP6LBafJJtC0GjEllz_nskGlRSpZ5eUPRRE1iMF985ZnZ1ITMZD'
// });

// map.setView({ center: new Microsoft.Maps.Location(0,0),
//   mapTypeId: Microsoft.Maps.MapTypeId.road
// });
