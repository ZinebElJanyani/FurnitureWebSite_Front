import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  customers: any;
  nbreCommands:any;
  nbreReviews: any;

  
  constructor(private clientService:AuthService){

  }
  ngOnInit(): void {
    this.displayCustomers()
   
  }
  displayCustomers(){
    this.getCustomers()
    this.getNbreCommands()
    this.getNbreReviews()
    setTimeout(()=>{   
      $('#customers-list').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        responsive : true,
        lengthMenu : [3, 5, 10]
    } );
    }, 1000);
  }
  getCustomers() {
    this.clientService.getRessource("showCustomers").subscribe(data=>{
      this.customers = data
    })
  }
  getNbreCommands(){
    this.clientService.getRessource("showCommandNbr").subscribe(data=>{
      this.nbreCommands = data
      console.log(data)
    })
  }

  getNbreReviews(){
    this.clientService.getRessource("showReviewsNbr").subscribe(data=>{
      this.nbreReviews = data
      console.log(data)
    })
  }

}
