// http://www.concretepage.com/angular-2/angular-2-custom-event-binding-eventemitter-example

import { SearchAddressVM } from './search.model.address';
import { SearchContactVM } from './search.model.contact';
export class SearchVM {
    constructor() {  }
    public contact: SearchContactVM = new SearchContactVM();
    public address: SearchAddressVM = new SearchAddressVM();
    
} // end SearchVM