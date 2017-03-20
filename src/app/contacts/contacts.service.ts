import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

//import { AuthenticationService } from '../_auth/_authentication.service';
import { Contact } from '../_models/contact';

@Injectable()
export class ContactsService {
    // constructor(private http: Http, private authenticationService: AuthenticationService) {
    // }
    // http://stackoverflow.com/questions/38058141/how-can-a-mock-a-http-observable-in-angular2-for-when-no-api-is-written
    private dummyData = {
        json: function () {
            alert("Hello Date");
            return [{ firstName: "Johnny", lastName: "Rocket" }, { firstName: "Silver", lastname: "Hi-ho" }];
        }
    }

    constructor(private http: Http) {

    }

    public getContacts(): Observable<Contact[]> {
        // get users from api
        // http://testingdatabase.oneadvocacy.com/api/ContactApi/?firstname=pa&lastname=ha
        //
        return Observable.create(() => { return this.dummyData })

        //var urls = "http://testingdatabase.oneadvocacy.com/api/ContactApi/?firstname=pa&lastname=ha"

        //return this.http.get(urls).map((response: Response) => response.json());

        // add authorization header with jwt token
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let options = new RequestOptions({ headers: headers });

        // // get users from api
        // return this.http.get('/api/users', options)
        //     .map((response: Response) => response.json());
    }



}