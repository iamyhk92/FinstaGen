import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContacmasterService } from '../../../../Services/Loans/Masters/contacmaster.service'
import { ContactIndividualComponent } from './contact-individual.component';
import { ContactBusinessComponent } from './contact-business.component'
import { ContactComponent } from './contact.component'

declare let $: any;
@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styles: []
})
export class ContactViewComponent implements OnInit {

  @ViewChild(ContactIndividualComponent, { static: false }) contactindividual: ContactIndividualComponent;
  @ViewChild(ContactBusinessComponent, { static: false }) contactbusiness: ContactBusinessComponent;
  @ViewChild(ContactComponent, { static: false }) contactmaster: ContactComponent;

  busstatus: boolean = true;
  TableColumnsDynamic = [];
  constructor(private zone: NgZone, private _contacmasterservice: ContacmasterService, private _routes: Router) {
    window['editDetails'] = {
      zone: this.zone,
      componentFn: (value) => this.editDetails(value),
      component: this,
    };
    window['deleteDetails'] = {
      zone: this.zone,
      componentFn: (value) => this.deleteDetails(value),
      component: this,
    };
    window['viewDetails'] = {
      zone: this.zone,
      componentFn: (value) => this.viewDetails(value),
      component: this,
    };
  }

  lstContactTotalDetails: any;
  DatatableInIt: any;

  ngOnInit() {



    this.TableColumnsDynamic = [
      // {
      //   "data": null, "sortable": false,
      // },
      {
        "title": "S.No.", "data": null,
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      },


      { "title": "Reference ID", "data": "pReferenceId", className: 'pReferenceId' },
      { "title": "Contact Type", "data": "pContactType", className: 'pContactType' },
      { "title": "Full Name", "data": "pName", className: 'pName' },
      { "title": "Contact No", "data": "pEmailidsList[0].pContactNumber", className: 'pContactNumber' },
      { "title": "Email ID", "data": "pEmailidsList[0].pEmailId", className: 'pEmailId' },
      { "title": "Status", "data": "pStatusname", className: 'pStatusname' },
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
      },
      {
        "title": "", "data": "null", "mData": null,
        "bSortable": false,
        "mRender": function (data, type, full) {
          return '<a  src=""><div id="icon-view"></div></a>';
        }
      }

    ];


    this.getContactTotalDetails();

  }

  getContactTotalDetails(): void {

    this._contacmasterservice.getContactTotalDetails().subscribe(json => {

      //console.log(json)
      if (json != null) {

        //this.lstContactTotalDetails = json as string
        //this.lstContactTotalDetails = eval("(" + this.lstContactTotalDetails + ')');
        //this.lstContactTotalDetails = this.lstContactTotalDetails.FT;

        let tablename = '#datatable'
        if (this.DatatableInIt != null) {
          this.DatatableInIt.destroy();
        }
        $('#datatable tbody').off('click', 'tr');
        this.DatatableInIt = $(tablename).DataTable({
          language: { searchPlaceholder: "Search Contact", search: "" },
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
          "bPaginate": true,
          "bInfo": false,
          "bFilter": true,
          //"Sort":false,
          //"bSort": false,
          'select': {
            'style': 'multi',
          },
          responsive: true,
          data: json,
          dom: 'Bfrtip',
          columns: this.TableColumnsDynamic,
          initComplete: function () {
            var $buttons = $('.dt-buttons').hide();
          }
        });
        let dataTableInfo = this.DatatableInIt

        $('#datatable tbody').on('click', 'tr', function (e) {

          let ClickValue = e.target.id;
          if (ClickValue == "icon-edit") {
            var data = dataTableInfo.row(this).data();
            window['editDetails'].componentFn(data)

          }
          if (ClickValue == "icon-delete") {
            debugger;
            var data = dataTableInfo.row(this).data();
            window['deleteDetails'].componentFn(data)

          }
          if (ClickValue == "icon-view") {
            var data = dataTableInfo.row(this).data();
            window['viewDetails'].componentFn(data)

          }
        });
      }
    });

  }



  editDetails(data) {

    try {

      
        this._contacmasterservice.loadEditInformation(data.pContactType, data.pReferenceId)
        this._routes.navigate(['/ContactForm'])
      

    } catch (e) {
      alert(e);

    }
  }
  deleteDetails(data) {
    debugger;
    data.pCreatedby = 1;
    if (data.pStatusname == 'ACTIVE' || data.pStatusname == null)
      data.pStatusname = 'IN-ACTIVE'
    else
      data.pStatusname = 'ACTIVE'
    this._contacmasterservice.deleteContactIndividual(data).subscribe(res => {
      this.getContactTotalDetails();
    });
  }
  viewDetails(data) {
    alert('VIEW FIRED');

  }
}
