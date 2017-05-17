// global.ts

 export const GlobalVariable = Object.freeze({
     BASE_API_URL: 'http://example.com/',
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