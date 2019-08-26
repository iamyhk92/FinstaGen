import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { LoansmasterService } from "../../../../Services/Loans/Masters/loansmaster.service";
import { CookieService } from 'ngx-cookie-service';


declare let $: any


@Component({
  selector: 'app-loansnamecode',
  templateUrl: './loansnamecode.component.html',
  styles: []
})
export class LoansnamecodeComponent implements OnInit {

  LoanTypesData: any
  Loansnamescodeform: FormGroup
  loannametype: any
  loans: any
  Ccode: string = ""
  Bcode: string = ""
  Lcode: string = ""
  LNcode: string;
  LNCcode: string;
  Lnamecode: string = ""
  nexttab: string;

  CompanyDetails: any
  DisplayData: any
  DatatableDisplaydata: any
  TableColumnsDynamic: any
  DatatableInIt: any;
  loanname: string
  loanid: any

  loannamecodecount: number

  LoanNameCodeSubscriber: any

  LoanType: string

  constructor(private cookieservice: CookieService, private zone: NgZone, private fb: FormBuilder, private _loanmasterservice: LoansmasterService) {

    window['CallingFunctionOutsideAngular'] = {
      zone: this.zone,
      componentFn: (value) => this.datatableclickedit(value),
      component: this,
    };


  }

  //ngDoCheck() {

  //  let res = this._loanmasterservice.GetDatatableRowEditClick()
  //  debugger

  //  if (res != null) {

  //    this.Loansnamescodeform.controls.pLoantypeid.setValue(res.pLoantypeid)
  //    this.Loansnamescodeform.controls.pLoanname.setValue(res.pLoanname)
  //    let str = res.pLoantype
  //    if (str != "") {
  //      let a = str.split(' ')
  //      for (var i = 0; i < a.length; i++) {
  //        this.Lcode += a[i].charAt(0)
  //      }
  //    }

  //    this.Loansnamescodeform.controls.pCompanycode.setValue(res.pCompanycode)
  //    this.Loansnamescodeform.controls.pBranchcode.setValue(res.pBranchcode)

  //    this.Loansnamescodeform.controls.pLoancode.setValue(res.pLoancode)
  //    this.Lnamecode = res.pLoanidcode
  //    this.Loansnamescodeform.controls.pLoanidcode.setValue(res.pLoanidcode)
  //    this.Loansnamescodeform.controls.pSeries.setValue(res.pSeries)
  //    this.Loansnamescodeform.controls.pSerieslength.setValue(res.pSerieslength)

  //    if (res.pStatusname == "ACTIVE") {
  //      this.Loansnamescodeform.controls.pStatusname.setValue("Active")
  //      this.Loansnamescodeform.controls.pStatusid.setValue("1")
  //    } else {
  //      this.Loansnamescodeform.controls.pStatusname.setValue("Inactive")
  //      this.Loansnamescodeform.controls.pStatusid.setValue("2")
  //    }


  //    let datatabledisplay = this.DisplayData
  //    this.DatatableDisplaydata = datatabledisplay.filter(function (loanname) {
  //      return loanname.pLoantype == res.pLoanname;
  //    });
  //    //sending data to datatable    
  //    this.CalDataTable(this.DatatableDisplaydata)


  //  }



  //}


  ngOnInit() {
    debugger

   
    this.TableColumnsDynamic = [
       //{
       //  "data": null, "sortable": false,
       //},
      {
        "title": "S.No.", "data": null,
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      },

      { "title": "Loan Type", "data": "pLoantype", className: 'loantype' },
      { "title": "Loan Name", "data": "pLoanname", className: 'loanname' },
      { "title": "Loan Code", "data": "pLoanidcode", className: 'cancelloancodedate' },
      { "title": "Status", "data": "pStatusname", className: 'status' },
      // {
      //   "title": "", "data": "null", "mData": null,
      //   "bSortable": false,
      //   "mRender": function (data, type, full) {
      //     return '<a  src=""><div id="icon-edit"></div></a>';
      //   }
      // },
      // {
      //   "title": "", "data": "null", "mData": null,
      //   "bSortable": false,
      //   "mRender": function (data, type, full) {
      //     return '<a  src=""><div id="icon-delete"></div></a>';
      //   }
      // }

    ];

    this.Loansnamescodeform = this.fb.group({
      pLoantypeid: ['', Validators.required],
      pLoanname: ['', [Validators.required]],
      pLoancode: ['', [Validators.required]],
      pCompanycode: [''],
      pBranchcode: [''],
      pSeries: ['', [Validators.required]],
      pSerieslength: [''],
      pLoanidcode: [''],
      pStatusname: [''],
      pStatusid: [''],

     // pCreatedby: [''],
      //pCreateddate: [''],
      // pModifiedby: [''],
      //pModifieddate: ['']

      pCreatedby: ['1'],
      pLoantype: [],
      pCreateddate: [null],
    })

    this._loanmasterservice.GetLoanMasterDetails().subscribe(json => {
      this.loans = json
    })

    this._loanmasterservice.GetCompanyBranchDetails().subscribe(json => {
      //debugger
      this.CompanyDetails = json
      this.Ccode = this.CompanyDetails[0].pEnterprisecode
      this.Bcode = this.CompanyDetails[0].pBranchcode

    })

    this._loanmasterservice.GetNameCodeData().subscribe(json => {      
      this.DisplayData = json
      // this.DisplayData = JSON.parse(this.DisplayData)    
      this.loanid = this.DisplayData[0].pLoanid
      this.CalDataTable(this.DisplayData)

      let buttontype = this._loanmasterservice.GetButtonClickType()
      if (buttontype != "New") {
        let res = this._loanmasterservice.GetDatatableRowEditClick()
        debugger
        if (res != null) {

          this.Loansnamescodeform.controls.pLoantypeid.setValue(res.pLoantypeid)
          this.Loansnamescodeform.controls.pLoanname.setValue(res.pLoanname)
          let str = res.pLoantype
          if (str != "") {
            let a = str.split(' ')
            for (var i = 0; i < a.length; i++) {
              this.Lcode += a[i].charAt(0)
            }
          }

          this.Loansnamescodeform.controls.pCompanycode.setValue(res.pCompanycode)
          this.Loansnamescodeform.controls.pBranchcode.setValue(res.pBranchcode)

          this.Loansnamescodeform.controls.pLoancode.setValue(res.pLoancode)
          this.Lnamecode = res.pLoanidcode
          this.LoanType = res.pLoantype
          this.Loansnamescodeform.controls.pLoanidcode.setValue(res.pLoanidcode)
          this.Loansnamescodeform.controls.pSeries.setValue(res.pSeries)
          this.Loansnamescodeform.controls.pSerieslength.setValue(res.pSerieslength)

          if (res.pStatusname == "ACTIVE") {
            this.Loansnamescodeform.controls.pStatusname.setValue("Active")
            this.Loansnamescodeform.controls.pStatusid.setValue("1")
          } else {
            this.Loansnamescodeform.controls.pStatusname.setValue("Inactive")
            this.Loansnamescodeform.controls.pStatusid.setValue("2")
          }


          let datatabledisplay = this.DisplayData
          this.DatatableDisplaydata = datatabledisplay.filter(function (loanname) {
            return loanname.pLoantype == res.pLoantype;
          });
          //sending data to datatable    
          this.CalDataTable(this.DatatableDisplaydata)
        }
      }


    })
    
     this.Loansnamescodeform.controls.pStatusname.setValue("Active")
     this.Loansnamescodeform.controls.pStatusid.setValue("1")

    
      //let buttontype = this._loanmasterservice.GetButtonClickType()
      //if (buttontype != "New") {
      //  let res = this._loanmasterservice.GetDatatableRowEditClick()
      //  debugger
      //  if (res != null) {

      //    this.Loansnamescodeform.controls.pLoantypeid.setValue(res.pLoantypeid)
      //    this.Loansnamescodeform.controls.pLoanname.setValue(res.pLoanname)
      //    let str = res.pLoantype
      //    if (str != "") {
      //      let a = str.split(' ')
      //      for (var i = 0; i < a.length; i++) {
      //        this.Lcode += a[i].charAt(0)
      //      }
      //    }

      //    this.Loansnamescodeform.controls.pCompanycode.setValue(res.pCompanycode)
      //    this.Loansnamescodeform.controls.pBranchcode.setValue(res.pBranchcode)

      //    this.Loansnamescodeform.controls.pLoancode.setValue(res.pLoancode)
      //    this.Lnamecode = res.pLoanidcode
      //    this.LoanType = res.pLoantype
      //    this.Loansnamescodeform.controls.pLoanidcode.setValue(res.pLoanidcode)
      //    this.Loansnamescodeform.controls.pSeries.setValue(res.pSeries)
      //    this.Loansnamescodeform.controls.pSerieslength.setValue(res.pSerieslength)

      //    if (res.pStatusname == "ACTIVE") {
      //      this.Loansnamescodeform.controls.pStatusname.setValue("Active")
      //      this.Loansnamescodeform.controls.pStatusid.setValue("1")
      //    } else {
      //      this.Loansnamescodeform.controls.pStatusname.setValue("Inactive")
      //      this.Loansnamescodeform.controls.pStatusid.setValue("2")
      //    }


      //    let datatabledisplay = this.DisplayData
      //    this.DatatableDisplaydata = datatabledisplay.filter(function (loanname) {
      //      return loanname.pLoantype == res.pLoantype;
      //    });
      //    //sending data to datatable    
      //    this.CalDataTable(this.DatatableDisplaydata)
      //  }
      //}
   

  }

  get f() { return this.Loansnamescodeform.controls; }

  GenerateLoanCode(event) {
     debugger
    let loanname = event.currentTarget.value
    let loancode = ""
    let checkparamtype = "loanname"
    this._loanmasterservice.CheckLoannameAndCodeDuplicate(loanname, loancode, checkparamtype).subscribe(count => {

      if (count == 0) {
        this.LNcode = ""
        let str = event.target.value
        if (str != "") {
          let a = str.split(' ')
          for (var i = 0; i < a.length; i++) {
            this.LNcode += a[i].charAt(0)
          }
          this.LNCcode = this.Lcode + this.LNcode
          this.Loansnamescodeform.controls.pLoancode.setValue(this.LNCcode)
          if (this.Loansnamescodeform.controls.pLoanname.value != "") {
            this.Lnamecode = this.LNCcode + this.Ccode + this.Bcode + this.Loansnamescodeform.controls.pSeries.value
          }
          // this.Loansnamescodeform.controls.pLoantypeid.setValue(this.Lcode)
        } else {
          this.Loansnamescodeform.controls.pLoanidcode.setValue("")
        }
      } else {
        alert("loan name already exists")
        this.Loansnamescodeform.controls.pLoanname.setValue("")
      }
    })


  }

  GenerateSeries(event) {
    debugger
    let str = event.currentTarget.value
    if (str != "") {
      this.Lnamecode = this.Loansnamescodeform.controls.pLoancode.value + this.Ccode + this.Bcode + str
      this.Loansnamescodeform.controls.pSerieslength.setValue(str.length)
      this.Loansnamescodeform.controls.pCompanycode.setValue(this.Ccode)
      this.Loansnamescodeform.controls.pBranchcode.setValue(this.Bcode)
      this.Loansnamescodeform.controls.pLoanidcode.setValue(this.Lnamecode)
    }
  }

  ChangeLoanType(args) {

    this.Lcode = ""
    // let  = event.currentTarget.value
    let str = args.target.options[args.target.selectedIndex].text
    this.LoanType = str

    if (str != "") {
      let a = str.split(' ')
      for (var i = 0; i < a.length; i++) {
        this.Lcode += a[i].charAt(0)
      }
    }
    this.Loansnamescodeform.controls.pLoantype.setValue(str);

    this.Loansnamescodeform.controls.pLoanname.setValue("");
    this.Loansnamescodeform.controls.pLoancode.setValue("");
    this.Loansnamescodeform.controls.pSeries.setValue("");
    this.Loansnamescodeform.controls.pLoanidcode.setValue("");
    this.Lnamecode = "";


    let datatabledisplay = this.DisplayData
    this.DatatableDisplaydata = datatabledisplay.filter(function (loanname) {
      return loanname.pLoantype == str;
    });

    //sending data to datatable    
    this.CalDataTable(this.DatatableDisplaydata)


  }

  Clear() {

    this.Loansnamescodeform.reset()
    this.Lnamecode = ""
    this.Loansnamescodeform.controls.loannamecode.setValue("")
    this.Loansnamescodeform.controls.loantype.setValue("")
    this.Loansnamescodeform.controls.pStatusname.setValue("Active")
    this.Loansnamescodeform.controls.pStatusid.setValue("1")
  }

  NextTabClick() {
    debugger
    if (this.Loansnamescodeform.invalid) {
      alert("fill required fields")
      return
    } else {

   

     let data = { "Loanname": this.LoanType, "LoannameCode": this.Lnamecode }
      this._loanmasterservice.SetLoanNameAndCodeToNextTab(data)



      this._loanmasterservice._addDataToLoanMaster(this.Loansnamescodeform.value, "loansnamecode");
      let str = "loanconfig"
      $('.nav-item a[href="#' + str + '"]').tab('show');


      //var Data = JSON.stringify(this.Loansnamescodeform.value)
      //this._loanmasterservice.SaveLoanNameCode(Data).subscribe(json => {

      //  if (json != "") {

      //    this._loanmasterservice.GetNameCodeData().subscribe(json => {

      //      this.DisplayData = json
      //      this.CalDataTable(this.DisplayData)
      //     // this.Loansnamescodeform.reset()
      //      this.Lnamecode = ""
      //      this.Loansnamescodeform.controls.pStatusname.setValue("Active")
      //      this.Loansnamescodeform.controls.pStatusid.setValue("1")
      //      this.Loansnamescodeform.controls.pLoantypeid.setValue("")

      //      let str = "loanconfig"
      //       $('.nav-item a[href="#' + str + '"]').tab('show');

      //    })
      //  }
      //})

      // let str = "loanconfig"
      // $('.nav-item a[href="#' + str + '"]').tab('show');
      

    }
  }

  CheckStatus(event) {

    var id = event.currentTarget.id
    var name = event.currentTarget.value
    this.Loansnamescodeform.controls.pStatusname.setValue(name)
    this.Loansnamescodeform.controls.pStatusid.setValue(id)
  }
  

  ngOnDestroy() {

  }

  datatableclickedit(data) {
    debugger


    let dt = data
    this.Loansnamescodeform.controls.pLoantypeid.setValue(dt.pLoantypeid)
    this.Loansnamescodeform.controls.pLoanname.setValue(dt.pLoanname)
    let str = dt.pLoantype
    if (str != "") {
      let a = str.split(' ')
      for (var i = 0; i < a.length; i++) {
        this.Lcode += a[i].charAt(0)
      }
    }
    this.Loansnamescodeform.controls.pLoancode.setValue(dt.pLoancode)
    this.Lnamecode = dt.pLoanidcode
    this.LoanType = dt.pLoantype
  }

  CalDataTable(TableData) {
    let tablename = '#Transfer'

    if (this.DatatableInIt != null) {
      this.DatatableInIt.destroy();
    }

    this.DatatableInIt = $(tablename).DataTable({
      language: { searchPlaceholder: "Search leads", search: "" },
      "bDestroy": true,
      'columnDefs': [
        {
          'targets': 0,
          'checkboxes': {
            'selectRow': true
          }


        },
      ],
      "processing": true,
      "bPaginate": true,
      "bInfo": false,
      "bFilter": true,
      //"Sort":false,
      //"bSort": false,
      'select': {
        'style': 'multi',
      },
      responsive: true,
      data: TableData,
      dom: 'Bfrtip',
      columns: this.TableColumnsDynamic,
      initComplete: function () {
        var $buttons = $('.dt-buttons').hide();
      }
    });
    let Newdatatable = this.DatatableInIt

    $('#Transfer tbody').on('click', 'tr', function (e) {

      let ClickValue = e.target.id;
      if (ClickValue == "icon-edit" || ClickValue == "icon-delete") {
        var data = Newdatatable.row(this).data();
        window['CallingFunctionOutsideAngular'].componentFn(data)

      }
    });


  }

  CheckLoanCodeDuplicate() {
    debugger
    let loanname = ""
    let loancode = this.Loansnamescodeform.controls.pLoancode.value
    let checkparamtype = "loancode"
    this._loanmasterservice.CheckLoannameAndCodeDuplicate(loanname, loancode, checkparamtype).subscribe(count => {

      if (count == 0) {
        // this.LNcode = ""
        // let str = event.target.value
        // if (str != "") {
        //   let a = str.split(' ')
        //   for (var i = 0; i < a.length; i++) {
        //     this.LNcode += a[i].charAt(0)
        //   }
        //   this.LNCcode = this.Lcode + this.LNcode
        //   this.Loansnamescodeform.controls.pLoancode.setValue(this.LNCcode)
        //   // this.Loansnamescodeform.controls.pLoantypeid.setValue(this.Lcode)
        // } else {
        //   this.Loansnamescodeform.controls.pLoanidcode.setValue("")
        // }
      } else {
        alert("loan code already exists")
        this.Loansnamescodeform.controls.pLoancode.setValue("")
      }
    })

  }
}
