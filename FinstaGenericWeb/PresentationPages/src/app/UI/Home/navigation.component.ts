import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.html',

  styles: []
})
export class NavigationComponent implements OnInit {

  constructor() { }

  TitleData: string;
  ngOnInit() {
  }

  Test(data) {

    if (data == "Loans Master") {
      //this.userservice.notifyToNavComp({ option: 'call_child', value: data })
      this.TitleData = "Loans Master"
    }
    else if (data == "Charges Master") {
      this.TitleData = "Charges Master"
    }
    else if (data == "Documents") {
      this.TitleData = "Documents"
    }
    else if (data == "Scheme Master") {
      this.TitleData = "Scheme Master"
    }
    else if (data == "Contact View") {
      this.TitleData = "Contact Master"
    }

  }
}
