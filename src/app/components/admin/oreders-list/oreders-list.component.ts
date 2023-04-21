import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandService } from 'src/app/services/command.service';

@Component({
  selector: 'app-oreders-list',
  templateUrl: './oreders-list.component.html',
  styleUrls: ['./oreders-list.component.css']
})
export class OredersListComponent implements OnInit{
  commands: any;
  showConfirmationDialog=false
  stateSelected=""
  StateValues=["placed","confirmed","inDelivery","cancelled","recieved"]

  orderForm:any
  orderId=0;

  constructor(private commandService:CommandService){
   
  }
  
    
get state(){
  return this.orderForm.get('state');
}
  ngOnInit(): void {
    this.diplayCommands()
    
   
  }
  initilizeForm() {
    this.orderForm=new FormGroup({
      state:new FormControl(this.stateSelected,Validators.required),})
  }

  diplayCommands() {
    this.getCommands()
    setTimeout(()=>{   
      $('#orders-list').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        responsive : true,
        lengthMenu : [3, 5, 10]
    } );
    }, 1000);
  }

  getCommands() {
   this.commandService.getRessource("showCommands").subscribe(data =>{
    this.commands = data
   
   })

  }

  onEditOrder(){
    
    this.commandService.changeState(this.orderForm.value.state,this.orderId).subscribe(data =>
      console.log(data)
      );
      setTimeout(() => {
        this.getCommands()
        this.showConfirmationDialog = false
      }, 2000);
   
  }
  openConfirmationDialog(orderId:number,commandIndex:number) {
  
    
    this.orderId = orderId
    this.showConfirmationDialog = true;
  this.stateSelected = this.commands[commandIndex].commandState
 
  this.initilizeForm()
  }
  
  closeConfirmationDialog() {
    this.showConfirmationDialog = false;
  }

}
