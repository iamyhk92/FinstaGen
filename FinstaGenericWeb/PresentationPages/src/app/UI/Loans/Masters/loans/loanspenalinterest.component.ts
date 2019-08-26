import { Component, OnInit } from '@angular/core';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';


declare let $: any;

@Component({
  selector: 'app-loanspenalinterest',
  templateUrl: './loanspenalinterest.component.html',
  styles: []
})
export class LoanspenalinterestComponent implements OnInit {

  Data: any
  constructor(private _loanmasterservice: LoansmasterService) { }

  ngDoCheck() {
    debugger;
    this.Data = this._loanmasterservice.GetLoanNameAndCodeDataInTabs();
  }

  ngOnInit() {
  }

  NextTabClick() {
    let str = "mandatorykyc"
    $('.nav-item a[href="#' + str + '"]').tab('show');
  }

}
