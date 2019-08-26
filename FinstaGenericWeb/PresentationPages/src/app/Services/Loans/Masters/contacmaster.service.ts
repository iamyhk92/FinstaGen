import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Contactmaster, Conatactdetais, Contactaddress } from '../../../Models/Loans/Masters/contactmaster';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContacmasterService {
  editinfo = [];
  _Contactaddress: Contactaddress[] = [];
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  });


  constructor(private http: HttpClient) { }

  saveContactIndividual(data, formtype) {

    try {
      let options = {
        headers: this.httpHeaders
      };
      if (formtype == 'Save')
        return this.http.post(environment.apiURL + '/loans/masters/contactmaster/Savecontact', data, options);
      else
        return this.http.post(environment.apiURL + '/loans/masters/contactmaster/UpdateContact', data, options);
      //return this.http.post(environment.apiURL + '/loans/masters/contact/Savecontact?contact=' + _contact, options);
    }
    catch (e) {
      alert(e);
    }
  }

  saveAddressType(data) {

    try {
      let options = {
        headers: this.httpHeaders
      };

      return this.http.post(environment.apiURL + '/loans/masters/contactmaster/SaveAddressType', data, options);

    }
    catch (e) {
      alert(e);
    }
  }

  deleteContactIndividual(data) {

    try {
      let options = {
        headers: this.httpHeaders
      };

      return this.http.post(environment.apiURL + '/loans/masters/contactmaster/DeleteContact', data, options);

    }
    catch (e) {
      alert(e);
    }
  }


  getContactTotalDetails(): any {

    try {
      return this.http.get(environment.apiURL + '/loans/masters/contactmaster/GetContactDetails');
    }
    catch (e) {
      alert(e);
    }
  }
  gettitleDetails(): any {

    try {
      return this.http.get(environment.apiURL + '/Settings/getContacttitles');
    }
    catch (e) {
      alert(e);
    }
  }
  getTypeofEnterprise(): any {

    try {
      return this.http.get(environment.apiURL + '/loans/masters/contactmaster/GetEnterpriseType');
    }
    catch (e) {
      alert(e);
    }
  }
  getNatureofBussiness(): any {

    try {
      return this.http.get(environment.apiURL + '/loans/masters/contactmaster/GetBusinessTypes');
    }
    catch (e) {
      alert(e);
    }
  }
  getAddressTypeDetails(): any {

    try {
      ///loans/masters / contact / GetAddressType
      return this.http.get(environment.apiURL + '/loans/masters/contactmaster/GetAddressType');
    }
    catch (e) {
      alert(e);
    }
  }
  getCountryDetails(): any {

    try {
      return this.http.get(environment.apiURL + '/Settings/getCountries');
    }
    catch (e) {
      alert(e);
    }
  }
  getSateDetails(countryid: number): any {

    try {
      return this.http.get(environment.apiURL + '/Settings/getStates?id=' + countryid);
    }
    catch (e) {
      alert(e);
    }
  }
  getDistrictDetails(stateid: number): any {

    try {
      return this.http.get(environment.apiURL + '/Settings/getDistricts?id=' + stateid);
    }
    catch (e) {
      alert(e);
    }
  }


  loadEditInformation(_contacttype, _referecnceid) {
    this.editinfo = [{ referecnceid: _referecnceid, contacttype: _contacttype }]
  }

  getEditInformation(): any {

    return this.editinfo;

  }
  getContactDetailsByID(referenceid): any {
    try {
      return this.http.get(environment.apiURL + '/loans/masters/contactmaster/ViewContact?refernceid=' + referenceid);
    }
    catch (e) {
      alert(e);
    }
  }
}
