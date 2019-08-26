import { Component, OnInit } from '@angular/core';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';


declare let $: any
@Component({
  selector: 'app-loansinstallmentduedate',
  templateUrl: './loansinstallmentduedate.component.html',
  styles: []
})
export class LoansinstallmentduedateComponent implements OnInit {

  Loansinstallmentduedate: any;
  Data: any;

  constructor(private _loanmasterservice: LoansmasterService) { }

  ngDoCheck() {
    debugger;
    this.Data = this._loanmasterservice.GetLoanNameAndCodeDataInTabs();
  }
  ngOnInit() {
    this.Loansinstallmentduedate = [];
  }

  NextTabClick() {

    this.Loansinstallmentduedate.push({
      "pDisbursefromday": "5",
      "pDisbursetoday": "10",
      "pInstalmentdueday": "15",
      "pLoantypeId": "2",
      "pTypeofInstalmentDay": "2019-08-23"
    })
    this._loanmasterservice._addDataToLoanMaster(this.Loansinstallmentduedate, "loansinstallmentduedate")
    let str = "penalinterest"
    $('.nav-item a[href="#' + str + '"]').tab('show');

  }
}
