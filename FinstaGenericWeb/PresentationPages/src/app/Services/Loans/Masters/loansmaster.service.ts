import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment"
import { Subject } from 'rxjs'




@Injectable({
  providedIn: 'root'
})
export class LoansmasterService {

  constructor(private _http: HttpClient) { }

  DataTableEditData: any
  TabsLoanNameCodeData: any
  ButtonClickType: string

  LoanMasterData: any;
  loansnamecode: any;
  loansconfiguration: any;
  loansinstallmentduedate: any;
  loanspenalinterest: any;
  loansidentificationdocuments: any;
  loansreferralcommission: any;

  //public notify = new Subject<any>();
  //notifyObservable$ = this.notify.asObservable();

  //public notifyOther(data: any) {
  //  if (data) {
  //    this.notify.next(data);
  //  }
  //}

  //nag


  _addDataToLoanMaster(Loandata, FormName) {
    debugger;
    if (FormName == "loansnamecode") { this.loansnamecode = Loandata }
    if (FormName == "loansconfiguration") { this.loansconfiguration = Loandata }
    if (FormName == "loansinstallmentduedate") { this.loansinstallmentduedate = Loandata }
    if (FormName == "loanspenalinterest") { this.loanspenalinterest = Loandata }
    if (FormName == "loansidentificationdocuments") { this.loansidentificationdocuments = Loandata }
    if (FormName == "loansreferralcommission") { this.loansreferralcommission = Loandata }
  }


  _getDatafromLoanMaster() {
    debugger;
    this.loansnamecode["instalmentdatedetailslist"] = this.loansinstallmentduedate;
    this.loansnamecode["loanconfigurationlist"] = this.loansconfiguration;
    this.loansnamecode["identificationdocumentsList"] = this.loansidentificationdocuments;
    return this.loansnamecode;
  }

  GetApplicanttypes() {
    debugger
    return this._http.get(environment.apiURL + '/Settings/getApplicanttypes')
  }
  saveLoanMaster(data) {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };

    return this._http.post(environment.apiURL + '/loans/masters/loanmaster/saveLoanMaster', data)
  }

  GetLoanDoucments(loanid) {
    debugger;
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    })
    let HttpParams = { 'pLoanId': loanid }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };

    return this._http.post(environment.apiURL + '/loans/masters/documentsmaster/Getdocumentidprofftypes', options);
  }

  //

  GetLoanMasterDetails() {
    return this._http.get(environment.apiURL + '/loans/masters/loanmaster/getLoanTypes')
  }

  GetCompanyBranchDetails() {
    return this._http.get(environment.apiURL + '/Settings/getCompanyandbranchdetails')
  }

  GetNameCodeData() {
    return this._http.get(environment.apiURL + '/loans/masters/loanmaster/getLoanMasterDetails')

  }
 
  SaveLoanNameCode(Data: any) {
    debugger
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    let data = Data
    return this._http.post(environment.apiURL + '/loans/masters/loanmaster/saveLoanMaster', data, options)

  }


  CheckLoannameAndCodeDuplicate(loanname, loancode, checkparamtype) {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    let HttpParams = { 'loanname': loanname, 'loancode': loancode, 'checkparamtype': checkparamtype }
    let options = {
      headers: httpHeaders,
      params: HttpParams
    };
    return this._http.get(environment.apiURL + '/loans/masters/loanmaster/checkInsertLoanNameandCodeDuplicates', options);
  }

  DataTableRowDeleteClick(loanid, modifiedby) {

    //let httpHeaders = new HttpHeaders({
    //  'Content-Type': 'application/json',
    //  'Cache-Control': 'no-cache'
    //});

    //let HttpParams = { 'loanid': loanid, 'modifiedby': modifiedby }
    //let options = {
    //  headers: httpHeaders,
    //  params: HttpParams
    //};

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    let data = { 'pLoanid': loanid, 'pModifiedby': modifiedby }

    return this._http.post(environment.apiURL + '/loans/masters/loanmaster/DeleteLoanMaster', data,options);
   // return this._http.post(environment.apiURL + '/loans/masters/loanmaster/DeleteLoanMaster' ,{'loanid':loanid,'modifiedby':modifiedby});
 
  }

  SetDatatableRowEditClick(data) {
    this.DataTableEditData = data
  }
  GetDatatableRowEditClick() {
    return this.DataTableEditData
  }

  SetLoanNameAndCodeToNextTab(data) {
    this.TabsLoanNameCodeData = data;
  }
  GetLoanNameAndCodeDataInTabs() {
    return this.TabsLoanNameCodeData
  }

  SetButtonClickType(type) {
    this.ButtonClickType = type
  }
  GetButtonClickType() {
    return this.ButtonClickType
  }

}
