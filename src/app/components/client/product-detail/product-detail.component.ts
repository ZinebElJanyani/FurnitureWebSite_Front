import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  imagePath=""
  images_product: any[] = [];
  product:any
  selectedIndx=0
  isFavorite=false
  isDescActive=false
  isInfActive=false
  isRevActive=true
  isTagActive=false
  quantity=1
  constructor( public categoryService:CategoryService,private sanitizer: DomSanitizer, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    let param = this.route.snapshot.params['p']
    this.getProduct(param)
  }
    
    OnImgClick(n : any){
      //this.imagePath = ""+(event?.srcElement as HTMLImageElement)?.getAttribute('src')
      this.selectedIndx = n
    }
    getProductImages( id:number){
      this.categoryService.getRessource("/productP/"+id)
      .subscribe((data: any) => {
        data.forEach((image: any) => {
         // const bytes = new Uint8Array(image);
         // const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
          let base64Image = `data:image/jpeg;base64,`+image;
  
          this.images_product.push(this.sanitizer.bypassSecurityTrustUrl(base64Image));
        });
         
        
        },err=>{
          console.log(err);
        })
    }

    getProduct(id:number){
      this.categoryService.getRessource("/product/"+id)
      .subscribe(data => 
        {this.product = data;
          console.log(this.product)
          this.getProductImages( id)
        
        },err=>{
          console.log(err);
        })
    }

    favoriteProduct(){
      this.isFavorite=!this.isFavorite
    }
  }


