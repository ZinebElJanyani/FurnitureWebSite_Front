import { CategoryService } from 'src/app/services/category.service';
import { CommandService } from './../../../services/command.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  orders:any
  isPaymentDisplay=false
  isDeliveryDisplay=false

  constructor(private commandService:CommandService,public categoryService:CategoryService){
  }

  ngOnInit(): void {
    this.getOrders();
  }


 getOrders() {
  this.commandService.getCommand().subscribe(data => {
    this.orders = data;
    console.log(data);
  })
}

}