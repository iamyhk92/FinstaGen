import { Component, OnInit, NgZone } from '@angular/core';
import { LoansmasterService } from "../../../../Services/Loans/Masters/loansmaster.service";
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

declare let $: any


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styles: []
})
export class LoansComponent implements OnInit {

  DisplayData: any
  DatatableInIt: any
  TableColumnsDynamic: any
  constructor(private _loanmasterservice: LoansmasterService, private zone: NgZone, private router: Router) {

    window['CallingFunctionOutsideAngularEdit'] = {
      zone: this.zone,
      componentFn: (value) => this.datatableclickedit(value),
      component: this,
    };

    window['CallingFunctionOutsideAngularDelete'] = {
      zone: this.zone,
      componentFn: (value) => this.datatableclickdelete(value),
      component: this,
    };

  }

  ngOnInit() {

    this.TableColumnsDynamic = [
      // {
      //   "data": null, "sortable": false,
      //},
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
          return '<a  src=""><div id="icon-delete"></div></a>';
        }
      }

    ];

    this._loanmasterservice.GetNameCodeData().subscribe(json => {
      debugger
      this.DisplayData = json
      //this.loanid = this.DisplayData[0].pLoanid
      this.CalDataTable(this.DisplayData)
    })

  }

  NewButtonClick(type) {
    this._loanmasterservice.SetButtonClickType(type)
  }

  CalDataTable(TableData) {

    let tablename = '#Transfer'
    if (this.DatatableInIt != null) {
      this.DatatableInIt.destroy();
    }
    $('#Transfer tbody').off('click', 'tr');
    this.DatatableInIt = $(tablename).DataTable({
      language: { searchPlaceholder: "Search leads", search: "" },
      "bDestroy": true,
      'columnDefs': [
        {
          'targets': 0,
          'checkboxes': {
            'selectRow': true
          },
          //'render': function (data, type, full, meta) {
          //  return '<input type="radio" id="radio" name="id[]" value="' + $('<div/>').text(data).html() + '">';
          //}
        },
        {
          extend: 'selectAll',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },
          }
        }, {
          extend: 'selectNone',
          exportOptions: {
            columns: ':visible',
            modifier: {
              selected: null
            },
          }
        }

      ],
      "processing": true,
      "bPaginate": true,
      "bInfo": false,
      "bFilter": true,
      "iDisplayLength": 10,
      // "Sort":false,
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
      debugger
      let ClickValue = e.target.id;
      if (ClickValue == "icon-edit") {
        var data = Newdatatable.row(this).data();
        window['CallingFunctionOutsideAngularEdit'].componentFn(data)
      }
      else if (ClickValue == "icon-delete") {
        var data = Newdatatable.row(this).data();
        window['CallingFunctionOutsideAngularDelete'].componentFn(data)
      }
      else if (ClickValue == "radio") {
        var data = Newdatatable.row(this).data();
       // window['CallingFunctionOutsideAngularDelete'].componentFn(data)
      }

    });


  }

  datatableclickedit(data) {
    debugger
    let dt = data;
    this._loanmasterservice.SetButtonClickType("Edit")
    this._loanmasterservice.SetDatatableRowEditClick(dt)
    let url = "/LoansCreation"
    this.router.navigate([url]);
    // this._loanmasterservice.notifyOther({ option: 'call_child', value: dt });

  }

  datatableclickdelete(data) {
    debugger

   
    let dt = data
    let loanid = dt.pLoanid
    let modifiedby = 1
   
    this._loanmasterservice.DataTableRowDeleteClick(loanid, modifiedby).subscribe(count => {
      debugger
       this._loanmasterservice.GetNameCodeData().subscribe(json => {
         debugger
         this.DisplayData = json
         //this.loanid = this.DisplayData[0].pLoanid
         this.CalDataTable(this.DisplayData)
       })

    })


  }



}
