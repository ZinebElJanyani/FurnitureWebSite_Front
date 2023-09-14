import { CategoryService } from 'src/app/services/category.service';
import { CommandService } from './../../../services/command.service';
import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orders:any
  isPaymentDisplay=false
  isDeliveryDisplay=false

  constructor( private viewportScroller:ViewportScroller,private commandService:CommandService,public categoryService:CategoryService){
  }

  ngOnInit(): void {
    this.getOrders();
  }
  scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

 getOrders() {
  this.commandService.getCommand().subscribe(data => {
    this.orders = data;
  // Sort the orders by date in descending order
    this.orders.sort((a:any, b:any) => b.date.localeCompare(a.date));

   // console.log(data);

  })
}
OnInvoiceClick(idCommand:number){
 
  this.commandService.exportPdfProduct(idCommand).subscribe((result:any) =>{
    const blob = new Blob([result],{type:'application/pdf'});
    
    const nav = (window.navigator as any);
    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(blob);
      return;
    }
   
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = data;
    link.download = "commandInvoice"+idCommand+".pdf";
    link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  },err =>{
    console.log(err)
  })
}

}