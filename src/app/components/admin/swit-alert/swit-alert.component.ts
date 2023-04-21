import { Component } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './swit-alert.component.html',
  styleUrls: ['./swit-alert.component.css']
})
export class SwitAlertComponent {
  isShow = true;

  oncloseClick(){
    this.isShow = false;
  }
}
