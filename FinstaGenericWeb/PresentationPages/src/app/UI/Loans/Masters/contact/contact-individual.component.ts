import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, FormArray } from '@angular/forms';
import { Contactmaster, Conatactdetais, Contactaddress } from './../../../../Models/Loans/Masters/contactmaster';
import { ContacmasterService } from '../../../../Services/Loans/Masters/contacmaster.service'
import { DefaultProfileImageService } from '../../../../Services/Loans/Masters/default-profile-image.service';
import { PhotouploadService } from '../../../../Services/Loans/Masters/photoupload.service'

declare var $: any;
@Component({
  selector: 'app-contact-individual',
  templateUrl: './contact-individual.component.html',
  styles: []
})
export class ContactIndividualComponent implements OnInit {
  @Input() referenceid: any;
  @Input() formtype: any;
  @Input() contactType: any;
  contactForm: FormGroup;
  addresstypeForm: FormGroup;
  croppedImage: any
  showPage = true;

  contactRecordId: any;
  contactRecordId1: any;
  contactSubmitted = false;
  contacAddrSubmitted = false;
  lstaddressdetails = [];
  lstContactDetailsByID: any;
  _contactmaster: Contactmaster;
  titleDetails: any;
  addressTypeDetails: any;
  countryDetails: any;
  stateDetails: any;
  districtDetails: any;
  constructor(private _profileuploadSer: PhotouploadService, private _defaultimage: DefaultProfileImageService, private formbuilder: FormBuilder, private _contacmasterservice: ContacmasterService) { }


  contactValidationErrors = {};
  addressTypeErrorMessage = {};

  ngOnInit() {
    debugger;
    if (this.contactType == 'Individual') {
      this.showPage = true;
    }
    else {
      this.showPage = false;
    }
    this.croppedImage = this._defaultimage.GetdefaultImage();

    //this._profileuploadSer.GetProfileImage().subscribe(json => {

    //  if (json != "" || json != null) {
    //    this.croppedImage = "data:image/png;base64," + json
    //  }
    //})
    this.addresstypeForm = this.formbuilder.group({
      pAddressType: ['', Validators.required],
      pStatusname: [''],
      pCreatedby: [''],
    })
    this.contactForm = this.formbuilder.group({
      pReferenceId: [''],
      pName: ['', Validators.required],

      pContactType: [''],
      pSurName: [''],
      pDob: ['', Validators.required],
      pGender: ['', Validators.required],
      pCreatedby: [''],
      pStatusname: [''],
      pFatherName: ['', Validators.required],
      pSpouseName: [''],
      pAge: ['', Validators.required],
      pTitleName: ['', Validators.required],

      pContactName: [''],
      pEmailId: ['', Validators.email],
      pEmailId2: ['', Validators.email],
      pContactNumber: ['', Validators.required],
      pAlternativeNo: [''],
      pRecordId: [''],
      pRecordId1: [''],
      pPriority: [''],
      pPrimaryAddressType: [''],
      pEmailidsList: this.formbuilder.array([]),
      pAddressControls: this.addAddressControls(),
      pAddressList: this.formbuilder.array([]),
    })
    //this.clearContactFormDeatails();
    this.getAddressTypeDetails();
    this.gettitleDetails();
    this.getCountryDetails();
    this.loadEditDetails();
    this.BlurEventAllControll(this.contactForm);
  }


  addcontactControls(): FormGroup {
    return this.formbuilder.group({
      pContactName: [''],
      pEmailId: [''],
      pContactNumber: [''],
      pPriority: [''],
      pRecordId: [''],
    })
  }
  addAddressControls(): FormGroup {
    return this.formbuilder.group({
      pAddressType: ['', Validators.required],
      pAddress1: [''],
      pAddress2: [''],
      pState: ['', Validators.required],
      pStateId: [''],
      pDistrict: ['', Validators.required],
      pDistrictId: [''],
      pCity: ['', Validators.required],

      pCountry: ['', Validators.required],
      pCountryId: ['',],
      pPinCode: ['', Validators.required],
      pPriority: [''],
      ptypeofoperation: [''],
      pAddressDetails: [''],
    })
  }

  BlurEventAllControll(fromgroup: FormGroup) {

    try {

      Object.keys(fromgroup.controls).forEach((key: string) => {

        if (key != 'pEmailidsList' && key != 'pAddressList')
          this.setBlurEvent(key);
      })

    }
    catch (e) {
      alert(e);
      return false;
    }
  }
  setBlurEvent(key: string) {

    try {
      let formcontrol;

      formcontrol = this.contactForm.get(key);


      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {

          this.BlurEventAllControll(formcontrol)
        }
        else {
          if (formcontrol.validator)
            this.contactForm.get(key).valueChanges.subscribe((data) => { this.GetContactValidationByControl(key, true) })


        }
      }
      else {

        formcontrol = <FormGroup>this.contactForm['controls']['pAddressControls'].get(key);
        if (formcontrol) {
          if (formcontrol instanceof FormGroup) {

            this.BlurEventAllControll(formcontrol)
          }
          else {
            if (formcontrol.validator)
              this.contactForm['controls']['pAddressControls'].get(key).valueChanges.subscribe((data) => { this.GetContactValidationByControl(key, true) })


          }
        }
      }
    }
    catch (e) {
      alert(e);
      return false;
    }



  }

  loadEditDetails() {


    this.contactForm['controls']['pReferenceId'].setValue(this.referenceid);
    if (this.formtype == 'Update' && this.contactType == 'Individual') {
      this._contacmasterservice.getContactDetailsByID(this.referenceid).subscribe(json => {
        debugger;
        //console.log(json)
        try {
          if (json != null) {


            this.contactForm['controls']['pName'].setValue(json.pName);
            this.contactForm['controls']['pContactType'].setValue(json.pContactType);
            this.contactType = json.pContactType;
            this.contactForm['controls']['pSurName'].setValue(json.pSurName);
            //let dat = new Date(json.pDob);
            let date = json.pDob.substr(0, 10).split('-');
            date = date[2] + '-' + date[1] + '-' + date[0]
            let dat = new Date(date);
            //this.contactForm.value['pDob'] = dat;
            this.contactForm['controls']['pDob'].setValue(date);
            this.contactForm['controls']['pGender'].setValue(json.pGender);
            this.contactForm['controls']['pCreatedby'].setValue(json.pCreatedby);
            this.contactForm['controls']['pStatusname'].setValue(json.pStatusname);
            this.contactForm['controls']['pFatherName'].setValue(json.pFatherName);
            this.contactForm['controls']['pSpouseName'].setValue(json.pSpouseName);
            this.contactForm['controls']['pAge'].setValue(json.pAge);

            this.contactForm['controls']['pTitleName'].setValue(json.pTitleName);

            for (let i = 0; i < json.pEmailidsList.length; i++) {
              if (json.pEmailidsList[i].pPriority == 'PRIMARY') {
                this.contactForm['controls']['pEmailId'].setValue(json.pEmailidsList[i].pEmailId);
                this.contactForm['controls']['pContactNumber'].setValue(json.pEmailidsList[i].pContactNumber);
                this.contactForm['controls']['pRecordId'].setValue(json.pEmailidsList[i].pRecordId);
                this.contactRecordId = json.pEmailidsList[i].pRecordId;
              }
              else {
                this.contactForm['controls']['pEmailId2'].setValue(json.pEmailidsList[i].pEmailId);
                this.contactForm['controls']['pAlternativeNo'].setValue(json.pEmailidsList[i].pContactNumber);
                this.contactForm['controls']['pRecordId1'].setValue(json.pEmailidsList[i].pRecordId);
                this.contactRecordId1 = json.pEmailidsList[i].pRecordId;

              }
            }
            this.lstaddressdetails = json.pAddressList;
            //this.lstContactDetailsByID = json as string
            //this.lstContactDetailsByID = eval("(" + this.lstContactDetailsByID + ')');
            //this.lstContactDetailsByID = this.lstContactDetailsByID.FT;
          }
        } catch (e) {
          alert(e);
        }
      });
    }
  }
  loadImages(EventData: string) {


    this.croppedImage = "data:image/png;base64," + EventData;
  }

  gettitleDetails(): void {

    this._contacmasterservice.gettitleDetails().subscribe(json => {

      //console.log(json)
      if (json != null) {
        this.titleDetails = json
        //this.titleDetails = json as string
        //this.titleDetails = eval("(" + this.titleDetails + ')');
        //this.titleDetails = this.titleDetails.FT;
      }
    });

  }
  getAddressTypeDetails(): void {


    this._contacmasterservice.getAddressTypeDetails().subscribe(json => {

      if (json != null) {
        this.addressTypeDetails = json;
        //this.addressTypeDetails = json as string
        //this.addressTypeDetails = eval("(" + this.addressTypeDetails + ')');
        //this.addressTypeDetails = this.addressTypeDetails.FT;
      }
    });


  }
  getCountryDetails(): void {

    this._contacmasterservice.getCountryDetails().subscribe(json => {

      //console.log(json)
      if (json != null) {
        this.countryDetails = json;
        //this.countryDetails = json as string
        //this.countryDetails = eval("(" + this.countryDetails + ')');
        //this.countryDetails = this.countryDetails.FT;
      }
    });

  }

  pCountry_Change($event: any): void {

    const countryid = $event.target.value;
    const countryname = $event.target.options[$event.target.selectedIndex].text;

    this.contactForm['controls']['pAddressControls']['controls']['pCountry'].setValue(countryname);
    //this.contactForm['controls']['pAddressControls']['controls']['pCountryId'].setValue(countryid);
    console.log(this.contactForm.value);
    this._contacmasterservice.getSateDetails(countryid).subscribe(json => {

      //console.log(json)
      if (json != null) {
        this.stateDetails = json;
        //this.stateDetails = json as string
        //this.stateDetails = eval("(" + this.stateDetails + ')');
        //this.stateDetails = this.stateDetails.FT;
      }
    });


  }
  pState_Change($event: any): void {

    const stateid = $event.target.value;
    const statename = $event.target.options[$event.target.selectedIndex].text;

    this.contactForm['controls']['pAddressControls']['controls']['pState'].setValue(statename);
    //this.contactForm['controls']['pAddressControls']['controls']['pStateId'].setValue(stateid);

    this._contacmasterservice.getDistrictDetails(stateid).subscribe(json => {

      //console.log(json)
      if (json != null) {
        this.districtDetails = json;
        //this.districtDetails = json as string
        //this.districtDetails = eval("(" + this.districtDetails + ')');
        //this.districtDetails = this.districtDetails.FT;
      }
    });

  }

  pDistrict_Change($event: any): void {

    const districtid = $event.target.value;
    const districtname = $event.target.options[$event.target.selectedIndex].text;

    this.contactForm['controls']['pAddressControls']['controls']['pDistrict'].setValue(districtname);
    //this.contactForm['controls']['pAddressControls']['controls']['pDistrictId'].setValue(districtid);

  }


  changeAddressPriority(index: number) {
    debugger;
    console.log(this.contactForm.value)
    for (let i = 0; i < this.lstaddressdetails.length; i++) {
      if (index == i) {
        this.lstaddressdetails[i].pPriority = 'PRIMARY';
        //this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pPriority'].setValue('PRIMARY');
      }
      else {
        this.lstaddressdetails[i].pPriority = '';
        //this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pPriority'].setValue(' ');
      }
    }
  }

  ageCalculation() {


    let dob = this.contactForm['controls']['pDob'].value;
    let timeDiff = Math.abs(Date.now() - new Date(dob).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    console.log(age)
    this.contactForm['controls']['pAge'].setValue(age);

  }

  checkContactValidations(group: FormGroup, isValid: boolean): boolean {

    try {

      Object.keys(group.controls).forEach((key: string) => {

        isValid = this.GetContactValidationByControl(key, isValid);
      })

    }
    catch (e) {
      alert(e);
      return false;
    }
    return isValid;
  }
  GetContactValidationByControl(key: string, isValid: boolean): boolean {

    try {
      let formcontrol;

      formcontrol = this.contactForm.get(key);
      if (!formcontrol)
        formcontrol = <FormGroup>this.contactForm['controls']['pAddressControls'].get(key);
      if (formcontrol) {
        if (formcontrol instanceof FormGroup) {
          debugger;
          if (key != 'pAddressControls')
            this.checkContactValidations(formcontrol, isValid)
        }
        else if (formcontrol.validator) {
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            let lablename;
            this.contactValidationErrors[key] = '';
            //if (key == 'pTitleName')
            //  lablename = 'Title';
            //else
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                if (errorkey == 'required')
                  errormessage = lablename + ' ' + errorkey;
                if (errorkey == 'email')
                  errormessage = 'Invalid ' + lablename;
                this.contactValidationErrors[key] += errormessage + ' ';
                isValid = false;
              }
            }

          }
        }
      }
    }
    catch (e) {
      alert(key);
      return false;
    }
    return isValid;
  }

  validateAddressDeatails(addressFormControl: FormGroup): boolean {
    let isValid = true;
    debugger;
    try {
      isValid = this.checkContactValidations(addressFormControl, isValid);

      let count = 0;
      let addresstype = addressFormControl.controls.pAddressType.value;
      for (let i = 0; i < this.lstaddressdetails.length; i++) {
        if (this.lstaddressdetails[i].pAddressType === addresstype) {
          count = 1;
          break;
        }
      }

      if (count > 0) {
        alert('Address Type Already Exist in Address Details');
        isValid = false;
      }

    } catch (e) {

    }
    return isValid;
  }
  validateSaveDeatails(control: FormGroup): boolean {
    let isValid = true;
    debugger;
    try {
      isValid = this.checkContactValidations(control, isValid);


      if (this.lstaddressdetails.length == 0) {
        alert('Enter Address Details');
        isValid = false;
      }
      else {
        let count = 0;

        for (let i = 0; i < this.lstaddressdetails.length; i++) {
          if (this.lstaddressdetails[i].pPriority === 'PRIMARY') {
            count = 1;
            break;
          }
        }

        if (count == 0) {
          alert('Select Primary Address in Address Details');
          isValid = false;
        }
      }

    } catch (e) {

    }
    return isValid;
  }

  addAddressDeatails(): void {
    debugger;
    try {
      let lablename;
      //this.contacAddrSubmitted = true;
      if (this.lstaddressdetails.length == 1) {
        lablename = (document.getElementById('inlineRadio2') as HTMLInputElement).value;
        alert(lablename);
      }


      const control = <FormGroup>this.contactForm['controls']['pAddressControls'];

      let addressdetails = '';

      if (control.controls.pAddress1.value && control.controls.pAddress1.value != '')
        addressdetails += control.controls.pAddress1.value + ', ';

      if (control.controls.pAddress2.value && control.controls.pAddress2.value != '')
        addressdetails += control.controls.pAddress2.value + ', ';

      if (control.controls.pCity.value && control.controls.pCity.value != '')
        addressdetails += control.controls.pCity.value + ', ';

      if (control.controls.pDistrict.value && control.controls.pDistrict.value != '')
        addressdetails += control.controls.pDistrict.value + ', ';

      if (control.controls.pState.value && control.controls.pState.value != '')
        addressdetails += control.controls.pState.value + ', ';

      if (control.controls.pCountry.value && control.controls.pCountry.value != '')
        addressdetails += control.controls.pCountry.value;

      if (control.controls.pPinCode.value && control.controls.pPinCode.value != '')
        addressdetails += ' - ' + control.controls.pCountry.value;

      control.value['pAddressDetails'] = addressdetails;

      debugger;

      if (this.validateAddressDeatails(control)) {
        control.value['ptypeofoperation'] = 'CREATE';
        this.lstaddressdetails.push(control.value);
        if (this.lstaddressdetails.length == 1) {
          this.contactForm['controls']['pPrimaryAddressType'].setValue(control.controls.pAddressType.value);
          this.contactForm['controls']['pPriority'].setValue('PRIMARY');
        }

        else {
          this.contactForm['controls']['pPrimaryAddressType'].setValue(' ');
          this.contactForm['controls']['pPriority'].setValue('  ');
        }
        //const addresscontrol = <FormArray>this.contactForm['controls']['pAddressList'];
        //addresscontrol.push(control);

        this.clearAddressDeatails();
      }
    }
    catch (e) {
      alert(e);
    }
  }
  clearAddressDeatails(): void {
    this.contactForm['controls']['pAddressControls'].reset();


    //this.contactForm['controls']['pAddressControls']['controls']['pAddressType'].setValue('');

    //this.contactForm['controls']['pAddressControls']['controls']['pState'].setValue('Select');
    //this.contactForm['controls']['pAddressControls']['controls']['pStateId'].setValue('');
    //this.contactForm['controls']['pAddressControls']['controls']['pDistrict'].setValue('Select');
    //this.contactForm['controls']['pAddressControls']['controls']['pDistrictId'].setValue('');
    //this.contactForm['controls']['pAddressControls']['controls']['pCountry'].setValue('Select');
    //this.contactForm['controls']['pAddressControls']['controls']['pCountryId'].setValue('');

    this.contactValidationErrors = {};

  }
  saveContactDetails(): void {
    debugger;
    try {
      this.contactSubmitted = true;
      this.contactForm['controls']['pReferenceId'].setValue(this.referenceid);
      this.contactForm['controls']['pCreatedby'].setValue(1);
      this.contactForm['controls']['pStatusname'].setValue('Active');
      this.contactForm['controls']['pContactType'].setValue(this.contactType);

      if (this.validateSaveDeatails(this.contactForm)) {

        const control = <FormArray>this.contactForm.controls['pEmailidsList'];
        control.push(this.addcontactControls());

        this.contactForm['controls']['pEmailidsList']['controls'][0]['controls']['pEmailId'].setValue(this.contactForm.controls.pEmailId.value);
        this.contactForm['controls']['pEmailidsList']['controls'][0]['controls']['pContactNumber'].setValue(this.contactForm.controls.pContactNumber.value);
        this.contactForm['controls']['pEmailidsList']['controls'][0]['controls']['pPriority'].setValue('PRIMARY');
        this.contactForm['controls']['pEmailidsList']['controls'][0]['controls']['pRecordId'].setValue(this.contactRecordId);
        this.contactForm['controls']['pEmailidsList']['controls'][0]['controls']['pContactName'].setValue(this.contactForm.controls.pName + ' ' + this.contactForm.controls.pSurName);

        const control1 = <FormArray>this.contactForm.controls['pEmailidsList'];
        control1.push(this.addcontactControls());
        debugger;
        if (this.contactForm.controls.pAlternativeNo.value || this.contactForm.controls.pAlternativeNo.value == '')
          this.contactForm.controls.pAlternativeNo.setValue(0);
        this.contactForm['controls']['pEmailidsList']['controls'][1]['controls']['pEmailId'].setValue(this.contactForm.controls.pEmailId2.value);
        this.contactForm['controls']['pEmailidsList']['controls'][1]['controls']['pContactNumber'].setValue(this.contactForm.controls.pAlternativeNo.value);
        this.contactForm['controls']['pEmailidsList']['controls'][1]['controls']['pPriority'].setValue(' ');
        this.contactForm['controls']['pEmailidsList']['controls'][1]['controls']['pRecordId'].setValue(this.contactRecordId1);
        this.contactForm['controls']['pEmailidsList']['controls'][1]['controls']['pContactName'].setValue(this.contactForm.controls.pName + ' ' + this.contactForm.controls.pSurName);

        //this.contactForm.value['pAddressList'][0].push(this.lstaddressdetails);
        //const addresscontrol = <FormArray>this.contactForm['controls']['pAddressList'];
        //addresscontrol.push(this.lstaddressdetails);

        for (let i = 0; i < this.lstaddressdetails.length; i++) {
          const addresscontrol = <FormArray>this.contactForm['controls']['pAddressList'];
          addresscontrol.push(this.addAddressControls());
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pAddressType'].setValue(this.lstaddressdetails[i].pAddressType);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pAddress1'].setValue(this.lstaddressdetails[i].pAddress1);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pAddress2'].setValue(this.lstaddressdetails[i].pAddress2);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pState'].setValue(this.lstaddressdetails[i].pState);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pStateId'].setValue(this.lstaddressdetails[i].pStateId);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pDistrict'].setValue(this.lstaddressdetails[i].pDistrict);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pDistrictId'].setValue(this.lstaddressdetails[i].pDistrictId);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pCity'].setValue(this.lstaddressdetails[i].pCity);

          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pCountry'].setValue(this.lstaddressdetails[i].pCountry);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pCountryId'].setValue(this.lstaddressdetails[i].pCountryId);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pPinCode'].setValue(this.lstaddressdetails[i].pPinCode);
          this.contactForm['controls']['pAddressList']['controls'][i]['controls']['pPriority'].setValue(this.lstaddressdetails[i].pPriority);

        }

        debugger;
        let data = JSON.stringify(this.contactForm.value)
        const contactControl = <FormArray>this.contactForm.controls['pEmailidsList'];
        for (let i = contactControl.length - 1; i >= 0; i--) {
          contactControl.removeAt(i)
        }
        const addressControl = <FormArray>this.contactForm.controls['pAddressList'];
        for (let i = addressControl.length - 1; i >= 0; i--) {
          addressControl.removeAt(i)
        }
        this._contacmasterservice.saveContactIndividual(data, this.formtype).subscribe(res => {
          alert("Saved Sucessfully");
          this.clearContactFormDeatails();
        });
      }
      //this.contactForm['controls']['pAddressList'].setValue(this.lstaddressdetails);
    }
    catch (e) {
      alert(e);
    }
    //this.contactForm  pAddressList

  }
  clearContactFormDeatails(): void {
    this.contactForm.reset();
    this.lstaddressdetails = [];

    this.contactForm['controls']['pTitleName'].setValue('');
    this.clearAddressDeatails();
  }

  GetAddressTypeValidationByControl(key: string, isValid: boolean): boolean {

    try {
      let formcontrol;

      formcontrol = this.addresstypeForm.get(key);

      if (formcontrol) {
        if (formcontrol.validator) {
          if (formcontrol.errors || formcontrol.invalid || formcontrol.touched || formcontrol.dirty) {
            key = key + 'Mst';
            let lablename;
            this.contactValidationErrors[key] = '';
            //if (key == 'pTitleName')
            //  lablename = 'Title';
            //else
            lablename = (document.getElementById(key) as HTMLInputElement).title;
            let errormessage;

            for (const errorkey in formcontrol.errors) {
              if (errorkey) {
                if (errorkey == 'required')
                  errormessage = lablename + ' ' + errorkey;
                if (errorkey == 'email')
                  errormessage = 'Invalid ' + lablename;
                this.addressTypeErrorMessage[key] = errormessage + ' ';
                isValid = false;
              }
            }

          }
        }
      }
    }
    catch (e) {
      alert(key);
      return false;
    }
    return isValid;
  }
  saveAddressType(): void {
    debugger;
    try {
      let isValid = true;
      debugger;

      if (this.GetAddressTypeValidationByControl('pAddressType', isValid)) {
        this.addresstypeForm['controls']['pCreatedby'].setValue(1);
        this.addresstypeForm['controls']['pStatusname'].setValue('Active');
        let data = JSON.stringify(this.addresstypeForm.value)
        this._contacmasterservice.saveAddressType(data).subscribe(res => {
          alert("Saved Sucessfully");
          $('#addresstype').modal('hide');
          this.addresstypeForm['controls']['pAddressType'].setValue('');
          this.clearAddressType();

        });
      }
    }
    catch (e) {
      alert(e);
    }
    //this.contactForm  pAddressList

  }

  clearAddressType(): void {
    this.addresstypeForm.reset();
    this.addressTypeErrorMessage = {};

  }
}
