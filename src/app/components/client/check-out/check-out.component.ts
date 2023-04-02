import { CommandService } from './../../../services/command.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { stat } from 'fs';
import { CaddyService } from 'src/app/services/caddy.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckOutValidators } from './checkOutValidators';
//import{render} from 'cresditcardpayments/cresditcardpayments';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '*'
      })),
      state('out', style({
        height: '0px'
      })),
      transition('in <=> out', animate('300ms ease-in-out')),
   
    ])
  ]
})
export class CheckOutComponent implements OnInit{
  @ViewChild('paypalref',{static:true}) private paypalRef:ElementRef | undefined

  isCreditCart=false
  isCOD=false;
  isPayPal=false
  ispaypalPayed=false
  user={
    id:0,
    name:"koko",
    phone:"",
    birthday:"",
    created_at:"",
    email:"",
    username:"",
    role:"",
    token :{
      acces_token:"",
      refresh_token:""
    }
  };
  defaultDate=""
  regions:any
  cities:any
  items:any
  cartSubTotal=0
  deliverySubtotal=0
  couponDicount =0
  orderTotal=0
  assemblySubtotal=0
  commandForm!:FormGroup // ! =>tells TypeScript that commandForm will be initialized in ngOnInit.


  idAddress=0
  idCommand=3;
  ngOnInit(): void {
    this.getCustomerDetail()
    this.getDeliveryDate()
    this.getRegions()
    this.getItems()
    this.getCartIfo()
    this.initilizeForm()
    this.paypal()
  }
  constructor(private commandService:CommandService,private caddyService : CaddyService){
   
  }

  initilizeForm(){
    this.commandForm=new FormGroup({
      name:new FormControl(String(this.user.name),Validators.required),
      email:new FormControl(this.user.email,[Validators.email,Validators.required]),
      phone:new FormControl(this.user.phone,[Validators.required,Validators.pattern(/^\d{10}$/)]),
      dateD:new FormControl(this.defaultDate,[Validators.required,CheckOutValidators.minDateValidator(new Date(this.defaultDate))]),
      region:new FormControl(this.regions,[Validators.required]),
      city:new FormControl(this.cities,[Validators.required]),
      address:new FormControl('',[Validators.required]),
      regesterAddress:new FormControl(''),
      withAssembly:new FormControl(''),
      cardNumber:new FormControl( ''),
      cardName:new FormControl(''),
      cvc:new FormControl('')
  })
  }

 
  get email(){
    return this.commandForm.get('email');
  }
  get name(){
    return this.commandForm.get('name');
  }
  get phone(){
    return this.commandForm.get('phone');
  }
  get dateD(){
    return this.commandForm.get('dateD');
  }
  get region(){
    return this.commandForm.get('region');
  }
  get city(){
    return this.commandForm.get('city');
  }
  get address(){
    return this.commandForm.get('address');
  }
  get regesterAddress(){
    return this.commandForm.get('regesterAddress');
  }
  get withAssembly(){
    return this.commandForm.get('withAssembly');
  }
  get cardNumber(){
    return this.commandForm.get('cardNumber');
  }

  get cardName(){
    return this.commandForm.get('cardName');
  }
  get cvc(){
    return this.commandForm.get('cvc');
  }

 
  getItems() {
    this.caddyService.showCart().subscribe(data => 
      {this.items = data;
        let Total = 0
        this.items.forEach((item:any) => {
          
          Total  =Total+ item.quantity*(item.product.price-item.product.promotion)
         
        });
        this.cartSubTotal = Total
      },err=>{
        console.log(err);
      })
  }

  getCustomerDetail(){
    const userString = localStorage.getItem('user');
    if (userString !== null) {
    this.user = JSON.parse(userString);
  }

  }

  getDeliveryDate(){
    const today = new Date();
    const twoDaysAhead = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
    this.defaultDate = twoDaysAhead.toISOString().substring(0, 10);
  }

  getRegions(){
    this.commandService.showRegions().subscribe(data => 
      {this.regions = data;
       
      },err=>{
        console.log(err);
      })
  }

  getCitiesIn(e:Event){

    let inputElement = e.target as HTMLInputElement
    let idR=Number(inputElement.value);
    this.commandService.showCities(idR).subscribe(data => 
      {this.cities = data;
       
      },err=>{
        console.log(err);
      })
  }

  getCartIfo(){
      this.caddyService.showCardInfo().subscribe((data:any) => 
        { let result = data

          this.orderTotal = result.totalPrice;
          this.couponDicount = result.coupon
         this.deliverySubtotal = result.deliveryPrice
        },err=>{
          console.log(err);
        })
  }
  onAssemblyChoose(){
    
    if(this.assemblySubtotal==0){
    this.assemblySubtotal=110
    this.orderTotal +=this.assemblySubtotal
  }
    
    else if (this.assemblySubtotal==110){
      this.orderTotal -=this.assemblySubtotal
      this.assemblySubtotal=0
      
    }

  }
  onPayPal(){
    this.isPayPal=!this.isPayPal;
    this.isCOD=false;
    this.isCreditCart=false
    this.cardNumber?.clearValidators()
    this.cardNumber?.updateValueAndValidity()
    this.cardName?.clearValidators();
    this.cardName?.updateValueAndValidity()
    this.cvc?.clearValidators();
    this.cvc?.updateValueAndValidity()
  }
  onCOD(){
    this.isCOD=!this.isCOD;
    this.isCreditCart=false;
    this.isPayPal=false
    this.cardNumber?.clearValidators()
    this.cardNumber?.updateValueAndValidity()
    this.cardName?.clearValidators();
    this.cardName?.updateValueAndValidity()
    this.cvc?.clearValidators();
    this.cvc?.updateValueAndValidity()
  }

  onCreditCard(){
    this.isCreditCart=!this.isCreditCart;
    this.isCOD=false;
    this.isPayPal=false
    
    this.cardNumber?.setValidators([Validators.required,Validators.pattern(/^[0-9]{16}$/)])
    this.cvc?.setValidators( [Validators.required,Validators.pattern(/^[0-9]{3,4}$/)])
    this.cardName?.setValidators( Validators.required)

    }

    setDeliveryAddress(idCity:number,adresse:string,isSaved:boolean){

      this.commandService.createDeliveryAddress(idCity,adresse,isSaved).subscribe(data => 
        {
         this.idAddress =Number(data)
        },err=>{
          console.log(err);
        })
    
    }
  Fcommand(){
    if(this.isCOD||this.isCreditCart||this.ispaypalPayed ){
      this.setDeliveryAddress(this.commandForm.value.city,this.commandForm.value.address,this.commandForm.value.regesterAddress)
      console.log('of1')
      setTimeout(() => {
        console.log('of2')
          this.setCommand(this.commandForm.value.phone,this.commandForm.value.email,this.commandForm.value.name,this.commandForm.value.dateD,this.commandForm.value.withAssembly)
        }, 1000);
      
      if(this.isCreditCart){
      setTimeout(() => {
        console.log('of3')
        this.setCreditCard(this.commandForm.value.cardName,this.commandForm.value.cardNumber,this.commandForm.value.cvc)

        }, 3000);
        }
        alert("Thank you for your purchase at Comfy! Your order has been successfully registered and a confirmation email with the details of your order will be sent to you.\nYou can check the status of your order by logging in to your account and accessing the 'My Orders' section.")
      }else{
        alert("In order to complete your command process, you should choose a payment method")
      }
    }

    setCommand(phone:string,email:string,name:string,deliveryDate:Date,withAssembly:boolean){
      let a=""
      if(this.isCreditCart){
          a="CreditCards"
      }else if(this.isCOD){
        a="Cash"
      }else if(this.isPayPal){
        a="PayPal"
      }
      console.log(a)
      this.commandService.createCommand(this.idAddress,phone,email,a,name,deliveryDate,withAssembly,this.assemblySubtotal,this.orderTotal,this.deliverySubtotal,this.couponDicount).subscribe(data => 
        {
         this.idCommand =Number(data)
        },err=>{
          console.log(err);
        })
    }

    setCreditCard(name:string,cardNumber:string,CVC:string){
      this.commandService.createPaymentCard(this.idCommand,name,cardNumber,CVC).subscribe(data => 
        {
         console.log(this.commandForm.value.cvc);
         
        },err=>{
          console.log(err);
        })
    }

    paypal(){
      const self = this; 
        let paypalButton= window.paypal
        .Buttons({
          style:{
            layout:'vertical',
            color:'gold',
            shape:'rect',
            label:'paypal'
          },
          
          createOrder:(data:any,actions:any)=>{
            return actions.order.create({
              purchase_units:[
                {
                  amount:{
                    value:12,
                    currency_code:'USD'
                  }
                }
              ]
            })
          },
    
          onApprove:(data:any,actions:any)=>{
          
            return actions.order.capture().then(function(details:any) {
              
              self.ispaypalPayed = true
            });
            
          },
         
          onError:(error:any )=> {
            paypalButton.close()
            console.log(error)
          }
    
        }).render(this.paypalRef?.nativeElement);
      }
}


