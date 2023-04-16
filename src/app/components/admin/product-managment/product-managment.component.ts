import { Component } from '@angular/core';

@Component({
  selector: 'app-product-managment',
  templateUrl: './product-managment.component.html',
  styleUrls: ['./product-managment.component.css']
})
export class ProductManagmentComponent {
  isInputActive=false;
  onInputBlur(value:String){
    if(value===""){
      this.isInputActive=false;
    }else{
      this.isInputActive=true;
    }
  }
}
