import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CaddyService } from 'src/app/services/caddy.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  
  wishlist_product:number[]=[]
  products:any

  constructor(private viewportScroller:ViewportScroller,public categoryService:CategoryService,public caddyService:CaddyService){}
  ngOnInit(): void {
    this.getFavorites()
  }
  getFavorites(){
    let data =  localStorage.getItem('wishlist')
    if(data){
      this.wishlist_product=JSON.parse(data)
     
    }

    this.categoryService.getFavoriteProducts(this.wishlist_product)
    .subscribe(data => {
      this.products = data
      console.log(data)
    },err=>{
      console.log(err);
    })
  }

  onRemoveProduct(id_product:number){
    this.categoryService.favoriteProduct(id_product,false); 
    const index = this.products.findIndex((obj:any) => obj.id === id_product);
    if(index>0){
      this.products.splice(index,1)
    }
  }

  onAddToCart(idProduct:number){
    
    this.caddyService.addItemToCart(idProduct,1);
    
    }
    scrollToElement(elementId: string): void {
      this.viewportScroller.scrollToAnchor(elementId);
    }
}
