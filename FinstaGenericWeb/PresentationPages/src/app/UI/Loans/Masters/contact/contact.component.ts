import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactIndividualComponent } from './contact-individual.component';
import { ContactBusinessComponent } from './contact-business.component'
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ContacmasterService } from '../../../../Services/Loans/Masters/contacmaster.service'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  referenceid: string;
  formtype: string;
  contactType: string;
  editinfo = [];
  @ViewChild(ContactIndividualComponent, { static: false }) contactindividual: ContactIndividualComponent;
  @ViewChild(ContactBusinessComponent, { static: false }) contactbusiness: ContactBusinessComponent;
  constructor(private formbuilder: FormBuilder, private _contacmasterservice: ContacmasterService) { }

  ngOnInit() {
    try {
      debugger;
    
    
      this.contactForm = this.formbuilder.group({
        Contacttype: [''],
      })

      this.loadData();
    } catch (e) {
      alert(e);
    }
  }
  contactType_Click(selectedtype: String): void {

    if (selectedtype == 'Individual') {
      this.contactindividual.showPage = true;
      this.contactbusiness.showPage = false;
      this.contactindividual.contactType = selectedtype;

    }
    else {
      this.contactindividual.showPage = false;
      this.contactbusiness.showPage = true;
      this.contactbusiness.contactType = selectedtype;

    }
  }

  loadData() {

    this.editinfo = this._contacmasterservice.getEditInformation();
    this._contacmasterservice.editinfo = [];
    if (this.editinfo.length > 0) {
      this.referenceid = this.editinfo[0].referecnceid;
      this.formtype = 'Update';
      let contacttype = this.editinfo[0].contacttype;
      this.contactForm['controls']['Contacttype'].setValue(contacttype);
      this.contactType = contacttype;
    }
    else {
      this.contactForm['controls']['Contacttype'].setValue('Individual');
      this.formtype = 'Save';
      this.contactType = 'Individual';
    }
   

  }
}
