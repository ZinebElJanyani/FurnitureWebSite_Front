import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { CategoryService } from './../../../services/category.service';
import { CaddyService } from './../../../services/caddy.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Console } from 'console';
import { data } from 'jquery';
import { ViewportScroller } from '@angular/common';
declare var $:any
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
  deliverySubtotal=500
  couponDicount =0

  orderTotal=0
  customer:any
  recommendations:any
  productsOutStock:string[] =[]
  isHide=false
  isFavorite:boolean[]=[];
  constructor(private viewportScroller:ViewportScroller,private  router: Router,private authService : AuthService ,private renderer: Renderer2,public caddyService :CaddyService,public categoryService:CategoryService){
   
  }
  ngOnInit(): void {
    this.showItems();
    if(localStorage.getItem('couponAmount')){
      this.couponDicount=Number(localStorage.getItem('couponAmount'))
    }
    this.getCRecommendations();
  }
getCRecommendations(){
  this.categoryService.getValues("getRecommandation/"+this.authService.userAutenticated.id).subscribe(data =>{
    this.recommendations = data
    console.log(data)
  })
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
    scrollToElement(elementId: string): void {
      this.viewportScroller.scrollToAnchor(elementId);
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
      const value = this.inputCoupon?.nativeElement.value;
      this.caddyService.verifyCoupon(value).subscribe(
        data=>{
          console.log(data)
  
          if(data!=0){
           if( localStorage.getItem('coupon')==value){
            alert("Sorry, this coupon has already been used. Please enter a different coupon code to avail the discount.")

           }else{
            this.couponDicount+= Number(data)
            localStorage.setItem('coupon',value);
            localStorage.setItem('couponAmount',String(this.couponDicount));
            alert("Congratulations! Your coupon code has been applied successfully. You will now receive the discounted price on your order. Thank you for choosing our website, and we hope you enjoy your purchase!")
            this.calculTotal()
            this.onUpdateCaddy()
            this.renderer.setProperty(this.inputCoupon?.nativeElement,'value',"")
          }
        }else{
            alert("We're sorry, the coupon code you entered is not valid. Please check the code and try again. If you continue to have trouble, please contact our customer support for assistance.")
            this.renderer.setProperty(this.inputCoupon?.nativeElement,'value',"Enter your code here.")
            }
          
        },err=>{
          console.log(err)
        }
        
      )
      
      /*if(!localStorage.getItem('coupon')){
        
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
      }*/

    }

    onUpdateCaddy(){
      this.caddyService.updateCaddy(this.orderTotal,this.deliverySubtotal,this.couponDicount).subscribe(data => 
        {console.log(data)
        },err=>{
          console.log(err);
        })
    }
    onPlaceOrder(){
      this.showItems()
      
      let NotoutOfStock=true
      
      this.productsOutStock.length=0
      this.items.forEach((item:any) => {
        if(item.product.qteStock<item.quantity){
          NotoutOfStock=false
          this.productsOutStock.push(item.product.nom)
        }
      });

      if(!NotoutOfStock){
        
        this.authService.loadUser()
        this.customer = this.authService.userAutenticated
       this.openModelopen()
      }else{

        this.router.navigate(["/check-out"]);
      }
    }
  openModelopen(){
  
      $('#productModal').modal('show')
     
  }
  closeModal(){
  
    $('#productModal').modal('hide')
   
}
  onProceed(){
    this.closeModal()
    this.items.forEach((item:any) => {
      if(item.product.qteStock<item.quantity){
       if(item.product.qteStock==0){
       
        
          this.caddyService.deleteItem(item.product.id).subscribe(data => 
            {
            
            },err=>{
              console.log(err);
            })
        
       }else{
     
        let newQ = item.quantity - item.product.qteStock;
        this.caddyService.addItemToCart(item.product.id,-newQ);}
      
      
      }
      this.showItems()
    });
    setTimeout(() => {
    this.router.navigate(["/check-out"]);
  }, 2000);
  }
  favorite(i:number,id_product:number){
    this.isFavorite[i] = !this.isFavorite[i];
    this.categoryService.favoriteProduct(id_product,this.isFavorite[i])
  }
}
