import { Component, OnInit } from '@angular/core';
import { LoansmasterService } from "../../../../Services/Loans/Masters/loansmaster.service";
declare let $: any
@Component({
  selector: 'app-loansidentificationdocuments',
  templateUrl: './loansidentificationdocuments.component.html',
  styles: []
})
export class LoansidentificationdocumentsComponent implements OnInit {


  LoanDoucments: any;
  values: any;
  DocumentsRequired: any;
  Data: any;
  constructor(private _loanmasterservice: LoansmasterService) { }

  ngDoCheck() {
    debugger;
    this.Data = this._loanmasterservice.GetLoanNameAndCodeDataInTabs();
  }

  ngOnInit() {
    this.DocumentsRequired = [];
    this._loanmasterservice.GetLoanDoucments("0").subscribe(data => {
      debugger;

      this.LoanDoucments = data

    }
    );
  }
  OnChange(data) {
    debugger;
    if (data.pDocumentRequired == false) {
      data.pDocumentRequired = true;
      data.pDocumentMandatory = true;
    }
    if (data.pDocumentMandatory == false) {
      data.pDocumentRequired = false;
    }
    this.DocumentsRequired.push(data);

  }

  NextTabClick() {
    debugger;
    this.DocumentsRequired = this.DocumentsRequired.filter(function (Data) {
      debugger;
      Data.pContactType = "INDIVIDUAL";
      return Data.pDocumentMandatory != false && Data.pDocumentRequired != false;
    })
    this._loanmasterservice._addDataToLoanMaster(this.DocumentsRequired, "loansidentificationdocuments")

    let str = "refferral"
    $('.nav-item a[href="#' + str + '"]').tab('show');


  }
}
