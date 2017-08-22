// global.ts

 export const GlobalVariable = Object.freeze({
   
     //BASE_API_URL: 'http://' + window.location.hostname + ':8080/api/v1',
     //BASE_OAUTH_URL: 'http://' + window.location.hostname + ':8080/token',
     BASE_API_URL: (window.location.hostname.indexOf("localhost") !== -1)?('http://'+window.location.hostname+':8080/v1'):('http://'+window.location.hostname+'/api/v1'),
     
     BASE_OAUTH_URL: (window.location.hostname.indexOf("localhost") !== -1)?('http://'+window.location.hostname+':8080/token'):('http://'+window.location.hostname+'/api/token'),
     //... more of your variables
 });


/*
source: http://stackoverflow.com/questions/36158848/what-is-the-best-way-to-declare-a-global-variable-in-angular-2-typescript
To use the following:

Refer the module using import.
//anotherfile.ts that refers to global constants
import { GlobalVariable } from './_global/global';

export class HeroService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;

    //... more code
}

*/
