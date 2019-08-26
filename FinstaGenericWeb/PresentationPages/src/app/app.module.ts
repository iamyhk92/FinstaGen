import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';

import { NumbersonlyDirective } from './Directives/numbersonly.directive';
import { AddressformatDirective } from './Directives/addressformat.directive';
import { CharactersonlyDirective } from './Directives/charactersonly.directive';
import { EmailpatternDirective } from './Directives/emailpattern.directive';
import { MycurrencyFormatterDirective } from './Directives/mycurrency-formatter.directive';
import { NewlineDirective } from './Directives/newline.directive';
import { TitlecasewordDirective } from './Directives/titlecaseword.directive';


import { AppComponent } from './app.component';


import { DashboardComponent } from './UI/Home/dashboard.component';
import { NavigationComponent } from './UI/Home/navigation.component';

import { ChargesComponent } from './UI/Loans/Masters/charges/charges.component';

import { ContactComponent } from './UI/Loans/Masters/contact/contact.component';
import { ContactViewComponent } from './UI/Loans/Masters/contact/contact-view.component';
import { ContactIndividualComponent } from './UI/Loans/Masters/contact/contact-individual.component';
import { ContactBusinessComponent } from './UI/Loans/Masters/contact/contact-business.component';

import { DocumentsComponent } from './UI/Loans/Masters/documents/documents.component';
import { LoansComponent } from './UI/Loans/Masters/loans/loans.component';
import { LoansCreationComponent } from './UI/Loans/Masters/loans/loans-creation.component';

import { SchemeComponent } from './UI/Loans/Masters/scheme/scheme.component';

import { LoansnamecodeComponent } from './UI/Loans/Masters/loans/loansnamecode.component';
import { LoansinstallmentduedateComponent } from './UI/Loans/Masters/loans/loansinstallmentduedate.component';
import { LoansconfigurationComponent } from './UI/Loans/Masters/loans/loansconfiguration.component';
import { LoanspenalinterestComponent } from './UI/Loans/Masters/loans/loanspenalinterest.component';
import { LoansidentificationdocumentsComponent } from './UI/Loans/Masters/loans/loansidentificationdocuments.component';
import { LoansreferralcommissionComponent } from './UI/Loans/Masters/loans/loansreferralcommission.component';
import { PhotouploadComponent } from './UI/Loans/Masters/contact/photoupload.component';


import { CookieService } from 'ngx-cookie-service';


const appRoutes: Routes = [


  {
    path: '', component: NavigationComponent,
    children: [
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'LoansMaster', component: LoansComponent },
      { path: 'ChargesMaster', component: ChargesComponent },
      { path: 'Documents', component: DocumentsComponent },
      { path: 'SchemeMaster', component: SchemeComponent },
      { path: 'ContactForm', component: ContactComponent },
      { path: 'ContactView', component: ContactViewComponent },
      { path: 'ContactIndividual', component: ContactIndividualComponent },
      { path: 'ContactBusiness', component: ContactBusinessComponent },

      { path: 'LoansCreation', component: LoansCreationComponent },

      { path: 'Loansnamecode', component: LoansnamecodeComponent },
      { path: 'Loansinstallmentduedate', component: LoansinstallmentduedateComponent },
      { path: 'Loanspenalinterest', component: LoanspenalinterestComponent },
      { path: 'Loansidentificationdocuments', component: LoansidentificationdocumentsComponent },
      { path: 'Loansreferralcommission', component: LoansreferralcommissionComponent },
      { path: 'Loansconfiguration', component: LoansconfigurationComponent },

    ]
  }



];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    ContactComponent,
    LoansCreationComponent,
    ChargesComponent,
    DocumentsComponent,
    SchemeComponent,
    ContactIndividualComponent,
    ContactBusinessComponent,
    LoansComponent,
    LoansnamecodeComponent,
    LoansinstallmentduedateComponent,
    LoansconfigurationComponent,
    LoanspenalinterestComponent,
    LoansidentificationdocumentsComponent,
    LoansreferralcommissionComponent,
    ContactViewComponent,
    PhotouploadComponent,
    NumbersonlyDirective,
    AddressformatDirective,
    CharactersonlyDirective,
    EmailpatternDirective,
    MycurrencyFormatterDirective,
    NewlineDirective,
    TitlecasewordDirective,
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
