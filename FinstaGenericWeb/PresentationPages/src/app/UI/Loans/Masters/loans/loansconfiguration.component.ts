import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoansmasterService } from 'src/app/Services/Loans/Masters/loansmaster.service';
declare let $: any

@Component({
  selector: 'app-loansconfiguration',
  templateUrl: './loansconfiguration.component.html',
  styles: []
})
export class LoansconfigurationComponent implements OnInit {
  LoanConfiguration: FormGroup
  ApplicantTypes: any;
  TableColumnsDynamic: any;
  GridData: any;
  GridDataInIt: any;
  LoanPayinPeriod: any;
  submitted = false;
  test: any;
  LoanconfigData: any;
  Data: any
  constructor(private formbuilder: FormBuilder, private _loanmasterservice: LoansmasterService) { }

   ngDoCheck() {
     debugger;
     this.Data = this._loanmasterservice.GetLoanNameAndCodeDataInTabs();
  }


  ngOnInit() {
    debugger;
    this.test = "test";
    this.LoanconfigData = [];
    this.LoanConfiguration = new FormGroup({
      pApplicanttype: new FormControl('', Validators.required),
      pLoanpayin: new FormControl('', Validators.required),
      pInteresttype: new FormControl('', Validators.required),
      pRateofinterest: new FormControl('', Validators.required),
      pMinloanamount: new FormControl(''),
      pMaxloanamount: new FormControl(''),
      pTenurefrom: new FormControl(''),
      pTenureto: new FormControl(''),
      pEffectfromdate: new FormControl('', Validators.required),
      ptypeofoperation: new FormControl(),
      pContacttype: new FormControl("INDIVIDUAL"),
      pEffecttodate: new FormControl("2019-09-19"),

    });

    this.TableColumnsDynamic = [

      {
        "title": "S.No.", "data": null,
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      },


      { "title": "Applicant type", "data": "pApplicanttype", className: 'loantype' },
      { "title": "Pay in", "data": "pLoanpayin", className: 'loanname' },
      { "title": "Interest Rate Type", "data": "pInteresttype", className: 'cancelloancodedate' },
      { "title": "Interest Rate", "data": "pRateofinterest", className: 'status' },
      { "title": "Min Loan Amt", "data": "pMinloanamount", className: 'loantype' },
      { "title": "Max Loan Amt", "data": "pMaxloanamount", className: 'loanname' },
      { "title": "Tenure from", "data": "pTenurefrom", className: 'cancelloancodedate' },
      { "title": "Tenure to", "data": "pTenureto", className: 'status' },
      { "title": "Effective From", "data": "pEffectfromdate", className: 'status' },
      {
        "title": "", "data": "null", "mData": null,
        "bSortable": false,
        "mRender": function (data, type, full) {
          return '<a  src=""><div id="icon-edit"></div></a>';
        }
      },
      {
        "title": "", "data": "null", "mData": null,
        "bSortable": false,
        "mRender": function (data, type, full) {
          return '<a (click)="datatableclick()" src=""><div id="icon-delete"></div></a>';
        }
      }

    ];
    debugger;
    this._loanmasterservice.GetApplicanttypes().subscribe(json => {
      debugger;
      if (json != "") {
        this.ApplicantTypes = json

      }
    })
    debugger;
    let Data = [];
    this.GridBinding(Data);


  }
  changevalue(value) {
    debugger;
    this.LoanPayinPeriod = value;
  }
  //ngDoCheck() {
  //  debugger;
  //  this.test = this._loanmasterservice._getSCurrentValues();
  //}
  GridBinding(griddata) {
    debugger;

    let tablename = '#LoanConfigurationTable'

    if (this.GridDataInIt != null) {
      this.GridDataInIt.destroy();
    }

    this.GridDataInIt = $(tablename).DataTable({
      language: { searchPlaceholder: "Search leads", search: "" },
      "bDestroy": true,
      'columnDefs': [
        {
          'targets': 0,
          'checkboxes': {
            'selectRow': true
          }


        }
      ],
      "processing": true,
      "bPaginate": false,
      "bInfo": false,
      "bFilter": true,
      'select': {
        'style': 'multi',
      },
      responsive: true,
      data: griddata,
      dom: 'Bfrtip',
      columns: this.TableColumnsDynamic,
      initComplete: function () {
        var $buttons = $('.dt-buttons').hide();
      }
    });
    let Newdatatable = this.GridDataInIt

    $('#LoanConfigurationTable tbody').on('click', 'tr', function (e) {
      debugger;
      let ClickValue = e.target.id;
      if (ClickValue == "icon-edit" || ClickValue == "icon-delete") {
        var data = Newdatatable.row(this).data();
      }
    });


  }
  AddDataToDataTable() {
    debugger;
    this.submitted = true;
    if (this.LoanConfiguration.valid) {
      this.GridDataInIt.row.add(this.LoanConfiguration.getRawValue()).draw().node();
    }
  }

  NextTabClick() {
    debugger;
    this.LoanconfigData.push(this.LoanConfiguration.getRawValue());
    this._loanmasterservice._addDataToLoanMaster(this.LoanconfigData, "loansconfiguration")
    let str = "InstallmentdueDate"
    $('.nav-item a[href="#' + str + '"]').tab('show');

  }

  CheckBoxCheck1(event) {
    debugger;
    var checked = event.target.checked
    if (checked == true) {
      this.LoanConfiguration.controls['pMinloanamount'].disable();
      this.LoanConfiguration.controls['pMaxloanamount'].disable();
    }
    else {
      this.LoanConfiguration.controls['pMinloanamount'].enable();
      this.LoanConfiguration.controls['pMaxloanamount'].enable();
    }

  }
  CheckBoxCheck2(event) {
    debugger;
    var checked = event.target.checked
    if (checked == true) {
      this.LoanConfiguration.controls['pTenurefrom'].disable();
      this.LoanConfiguration.controls['pTenureto'].disable();
    }
    else {
      this.LoanConfiguration.controls['pTenurefrom'].enable();
      this.LoanConfiguration.controls['pTenureto'].enable();
    }
  }










}
