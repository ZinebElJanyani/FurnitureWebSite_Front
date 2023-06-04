import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit{
  orderID=0

  order:any
  constructor(private route: ActivatedRoute,private commandService:CommandService){
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
     this.orderID = params['id'];

    });
  
        this.getOrder()
     
  }

  getOrder() {
    this.commandService.getRessource("showCommand/"+this.orderID).subscribe(
      data =>{
        this.order = data;
        console.log(data)
      }
    )
  }

  

}
