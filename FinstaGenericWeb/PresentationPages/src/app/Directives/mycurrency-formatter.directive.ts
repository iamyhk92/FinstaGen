import { Directive, Output, Renderer2, EventEmitter, ElementRef, HostListener, Input, OnInit, AfterViewInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Directive({
  selector: '[appMycurrencyFormatter]'
})
export class MycurrencyFormatterDirective {

  data: any;

  constructor(private cookieservice:CookieService,private render: Renderer2, private elRef: ElementRef) {
  }

  // @HostListener('blur') blur() {
    
  //   let d = this.elRef.nativeElement.value;

  //   let s = d.split(',');
  //   let n = s.join('')
  //   d = n;
  //   if(d==0){
  //     d=""
  //   }
  //   if (d != '') {
  //   //  this.data = this.countries.getselecteddata();
  //     this.data=this.cookieservice.get("savedformat")
  //     if (this.data == "India") {

  //       // var currencySymbol = '₹';
  //       var result = d.toString().split('.');
  //       var lastThree = result[0].substring(result[0].length - 3);
  //       var otherNumbers = result[0].substring(0, result[0].length - 3);
  //       if (otherNumbers != '')
  //         lastThree = ',' + lastThree;
  //       var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  //       if (result.length > 1) {
  //         output += "." + result[1];
  //       }
  //       // d = currencySymbol + output;
  //       d = output;

  //       this.render.setProperty(this.elRef.nativeElement, 'value', d);

  //     }
  //     else {
  //       // var currencySymbol = '₹';
  //       var result = d.toString().split('.');
  //       var lastThree = result[0].substring(result[0].length - 3);
  //       var otherNumbers = result[0].substring(0, result[0].length - 3);
  //       if (otherNumbers != '')
  //         lastThree = ',' + lastThree;
  //       var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
  //       if (result.length > 1) {
  //         output += "." + result[1];
  //       }
  //       //d = currencySymbol + output;
  //       d = output;
  //       this.render.setProperty(this.elRef.nativeElement, 'value', d);

  //     }
  //   }

  // }

  @HostListener('input') Input(){

    let d = this.elRef.nativeElement.value;

    let s = d.split(',');
    let n = s.join('')
    d = n;
    if(d==0){
      d=""
    }
    if (d != '') {  

    //  this.data = this.cookieservice.get("savedformat")
      this.data="India"
      if (this.data == "India") {       
        var result = d.toString().split('.');
        var lastThree = result[0].substring(result[0].length - 3);
        var otherNumbers = result[0].substring(0, result[0].length - 3);
        if (otherNumbers != '')
          lastThree = ',' + lastThree;
        var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        if (result.length > 1) {
          output += "." + result[1];
        }      
        d = output;
        this.render.setProperty(this.elRef.nativeElement, 'value', d);
      }
      else {      
        var result = d.toString().split('.');
        var lastThree = result[0].substring(result[0].length - 3);
        var otherNumbers = result[0].substring(0, result[0].length - 3);
        if (otherNumbers != '')
          lastThree = ',' + lastThree;
        var output = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree;
        if (result.length > 1) {
          output += "." + result[1];
        }      
        d = output;
        this.render.setProperty(this.elRef.nativeElement, 'value', d);
      }

    }

  }

}
