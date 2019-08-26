import { Component, OnInit } from '@angular/core';
import { LoansmasterService } from "../../../../Services/Loans/Masters/loansmaster.service";
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-loans-creation',
  templateUrl: './Loans-creation.html',
})
export class LoansCreationComponent implements OnInit {

  Loanname: string;
  Loancode: string;
  constructor(private _loanmasterservice: LoansmasterService, private router: Router) { }

  ngOnInit() {

  
  }

  ChangeTab(data) {
    debugger
    
    let url = "/" + data;
    this.router.navigate([url]);
  }
}
