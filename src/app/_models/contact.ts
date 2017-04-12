// [{"ContactId":294943,"FirstName":"Zelma","LastName":"Humphrey","Street":"636 E Hill St - Oklahoma City","Latitude":0.000000,"Longitude":0.000000,"AddressDefaultDisplayID":160057,"Address":{"AddressId":0,"Street":null,"Street2":null,"City":"Oklahoma City","State":"OK","ZipCode":"73105","Latitude":0.000000,"Longitude":0.000000},"Attributes":null,"Logs":null,"HasVoted":0},{"ContactId":67572,"FirstName":"Zachary","LastName":"Humphrey","Street":"2128 NW 157 Ter - Edmond","Latitude":0.000000,"Longitude":0.000000,"AddressDefaultDisplayID":24595,"Address":{"AddressId":0,"Street":null,"Street2":null,"City":"Edmond","State":"OK","ZipCode":"73013","Latitude":0.000000,"Longitude":0.000000},"Attributes":null,"Logs":null,"HasVoted":0},{"ContactId":73048,"FirstName":"Zachary","LastName":"Humphreys","Street":"17300 Sun River Ct - Edmond","Latitude":0.000000,"Longitude":0.000000,"AddressDefaultDisplayID":27737,"Address":{"AddressId":0,"Street":null,"Street2":null,"City":"Edmond","State":"OK","ZipCode":"73012","Latitude":0.000000,"Longitude":0.000000},"Attributes":null,"Logs":null,"HasVoted":0}]
import { AddressVM } from '../_models/address';
export class ContactVM {
    ContactId: number;
    FirstName: string;
    LastName: string;
  //  Street: string;
  //  Latitude: string;
  //  Longitude: string;
 //   AddressDefaultDisplayID: number;
    Address: AddressVM [];
    }