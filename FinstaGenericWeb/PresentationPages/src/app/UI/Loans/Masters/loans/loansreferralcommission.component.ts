import { Component, OnInit } from '@angular/core';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';
@Component({
  selector: 'app-loansreferralcommission',
  templateUrl: './loansreferralcommission.component.html',
  styles: []
})
export class LoansreferralcommissionComponent implements OnInit {

  Data: any
  constructor(private _loanmasterservice: LoansmasterService) { }

  ngDoCheck() {
    debugger;
    this.Data = this._loanmasterservice.GetLoanNameAndCodeDataInTabs();
  }
  ngOnInit() {
    debugger;
    this._loanmasterservice._getDatafromLoanMaster();
  }
  SaveLoanMaster() {
    debugger;
    let FormData = (this._loanmasterservice._getDatafromLoanMaster());
    //let kk = {

    //  "pLoantypeid": "2",
    //  "pLoantype": "VEHICLE LOAN",
    //  "pLoanname": "2-Wheeler Loan",
    //  "pLoancode": "VLTW",
    //  "pCompanycode": "TK",
    //  "pBranchcode": "KP",
    //  "pSeries": "00001",
    //  "pSerieslength": "5",
    //  "pLoanidcode": "VLTWTKKP00001",
    //  "instalmentdatedetailslist": [{
    //    "pLoantypeId": "2",
    //    "pTypeofInstalmentDay": "2019-08-23",
    //    "pDisbursefromday": "5",
    //    "pDisbursetoday": "10",
    //    "pInstalmentdueday": "15"
    //  }],
    //  "loanconfigurationlist": [{
    //    "pLoantypeId": "2",
    //    "pContacttype": "INDIVIDUAL",
    //    "pApplicanttype": "REGULAR/GENERAL",
    //    "pLoanpayin": "MONTHLY",
    //    "pMinloanamount": "50000",
    //    "pMaxloanamount": "200000",
    //    "pTenurefrom": "12",
    //    "pTenureto": "36",
    //    "pInteresttype": "FLAT",
    //    "pRateofinterest": "24",
    //    "pEffectfromdate": "2019-08-23",
    //    "pEffecttodate": "2020-08-23",
    //    "ptypeofoperation": " "
    //  }],
    //  "identificationdocumentsList": [{
    //    "pLoantypeId": "2",
    //    "pContactType": "INDIVIDUAL",
    //    "pDocumentId": "1",
    //    "pDocumentgroupId": "1",
    //    "pDocumentRequired": "TRUE",
    //    "pDocumentMandatory": "TRUE"
    //  }],

    //  "pCreatedby": 1,
    //  "pCreateddate": "2019-08-23",
    //  "pStatusid": "1",
    //  "pStatusname": "ACTIVE"

    //}

    this._loanmasterservice.saveLoanMaster(FormData).subscribe(res => {
      debugger;
      if (res == true) {
        alert("Saved Successfully")
        location.reload();
      }
    });
  }
}
