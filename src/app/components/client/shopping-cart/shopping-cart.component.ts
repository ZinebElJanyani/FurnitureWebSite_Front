import { CategoryService } from './../../../services/category.service';
import { CaddyService } from './../../../services/caddy.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild('inputCoupon') inputCoupon?: ElementRef;
  quantity=0
  items:any
  cartSubTotal=0
  deliverySubtotal=250
  couponDicount =0
  couponCode :String
  orderTotal=0

  constructor(private renderer: Renderer2,public caddyService :CaddyService,public categoryService:CategoryService){
    this.couponCode="124GN%SI&13DDF"
  }
  ngOnInit(): void {
    this.showItems();
    if(localStorage.getItem('coupon')){
      this.couponDicount=150
    }
  }

calculTotal(){
  this.orderTotal=this.cartSubTotal+this.deliverySubtotal-this.couponDicount

}
  showItems(){
    this.caddyService.showCart().subscribe(data => 
      {this.items = data;
       
        this.onCartSubTotal()
        this.calculTotal()
        this.onUpdateCaddy()
      },err=>{
        console.log(err);
      })
  }
  onAddToCart(idProduct:number,quantity:number){
    
    this.caddyService.addItemToCart(idProduct,quantity);
    
    setTimeout(() => {
      this.showItems();
    }, 100);
    }

    onDeleteItem(pId:number){
     
      setTimeout(() => {
        this.caddyService.deleteItem(pId).subscribe(data => 
          {
          
          },err=>{
            console.log(err);
          })
      }, 100);

      this.showItems();
    }

    onCartSubTotal(){
      let Total = 0
      this.items.forEach((item:any) => {
        
        Total  =Total+ item.quantity*(item.product.price-item.product.promotion)
       
      });
      this.cartSubTotal = Total
      if(this.cartSubTotal>=2000){
        this.deliverySubtotal = 0
      }else if(this.cartSubTotal<2000){
        this.deliverySubtotal = 250
      }
    }

    onCouponCode(){
      if(!localStorage.getItem('coupon')){
        
      const value = this.inputCoupon?.nativeElement.value;
      if(value==this.couponCode){
      localStorage.setItem('coupon',"150:124GN%SI&13DDF");
      alert("Congratulations! Your coupon code has been applied successfully. You will now receive the discounted price on your order. Thank you for choosing our website, and we hope you enjoy your purchase!")
      this.couponDicount=150
      this.calculTotal()
      this.onUpdateCaddy()
      this.renderer.setProperty(this.inputCoupon?.nativeElement,'value',"")
        }else{
          alert("We're sorry, the coupon code you entered is not valid. Please check the code and try again. If you continue to have trouble, please contact our customer support for assistance.")
          this.renderer.setProperty(this.inputCoupon?.nativeElement,'value',"Enter your code here.")
        }
      }else{
        alert("Sorry, this coupon has already been used. Please enter a different coupon code to avail the discount.")
      }

    }

    onUpdateCaddy(){
      this.caddyService.updateCaddy(this.orderTotal,this.deliverySubtotal,this.couponDicount).subscribe(data => 
        {console.log(data)
        },err=>{
          console.log(err);
        })
    }
}
