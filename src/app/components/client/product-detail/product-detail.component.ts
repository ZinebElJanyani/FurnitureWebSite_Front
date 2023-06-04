import { CaddyService } from './../../../services/caddy.service';
import { AuthService } from './../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpEventType,HttpRequest } from '@angular/common/http';


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
  oneStar=false;
  twoStar=false
  threeStar=false
  fourStar=false
  fiveStar=false
  nbrStars=0
  reviewForm:any
   numbers: number[] = [1, 2, 3, 4, 5];
  selectedFile: any;
  progress=0;
  currentFileUpload: any;
  reviews:any
  wishlist_product:number[]=[]
  


  constructor( public caddyService:CaddyService, public authService: AuthService,public categoryService:CategoryService,private sanitizer: DomSanitizer, private route:ActivatedRoute){
    
  }
  ngOnInit(): void {
    let param = this.route.snapshot.params['p']
    this.getProduct(param)
    this.initilizeForm()
    setTimeout(() => {
      this.getReviews()
     
    }, 1000);
    setTimeout(() => {
      this.IsFavorite(this.product.id)     
    }, 1000);
    
   
  }
  initilizeForm(){
    this.reviewForm=new FormGroup({
      name:new FormControl(this.authService.userAutenticated.name,Validators.required),
      title:new FormControl("my review"),
      text:new FormControl("",Validators.required),

       recommandProduct:new FormControl(''),
    
  })
  }
  get name(){
    return this.reviewForm.get('name');
  }
  get title(){
    return this.reviewForm.get('title');
  }
  get text(){
    return this.reviewForm.get('text');
  }
  get image(){
    return this.reviewForm.get('image');
  }
  get recommandProduct(){
    return this.reviewForm.get('recommandProduct');
  }
  fullStarsArray(averageRating:number): number[] {
    const fullStars = Math.floor(averageRating);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(averageRating:number): boolean {
    return (averageRating - Math.floor(averageRating)) >= 0.5;
  }
  hasEmptyStar(averageRating:number):  number[] {
    const starsNbre=5
    let rest:number
    rest = starsNbre - Math.floor(averageRating);
    if(this.hasHalfStar(averageRating)){
      rest -=1
    }
    return Array(rest).fill(0);
    }

  Freview(){
   
      
   this.categoryService.addReview(this.product.id,this.nbrStars,this.reviewForm.value.title,this.reviewForm.value.text,"",this.reviewForm.value.recommandProduct,this.reviewForm.value.name)
   .subscribe((data:any) => 
      {
     
       if(this.selectedFile){
        setTimeout(() => {
          this.onUploadImage(data);
          console.log("koko")
        }, 2000);  
       }
      },err=>{
        console.log(err);
      })

      this.reviewForm.reset()
      this.oneStar=false
      this.threeStar=false
      this.fourStar=false
      this.twoStar=false
      this.fiveStar=false
      setTimeout(() => {
        this.getReviews()
       
      }, 1000);
  }
  onSelectedFile(event:Event){
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files;

  }
  onUploadImage(idReview:number){
   
    this.progress = 0
    this.currentFileUpload = this.selectedFile.item(0)
    this.categoryService.uploadImageReview(this.currentFileUpload,idReview)
    .subscribe(event =>{
        if(event.type=== HttpEventType.UploadProgress){
          if(event!= undefined){
          this.progress = event.total ? Math.round(100*event.loaded / event.total) : 0;
          }
        }else if(event instanceof HttpRequest){
          alert("success")
        }
      },err=>{
          console.log(err)
        }
    )
  }
    onOneStar(){
      
      this.oneStar=!this.oneStar;
      this.twoStar=false;
      this.threeStar=false;
      this.fiveStar=false;
      this.fourStar=false
      if(this.oneStar){
        this.nbrStars=1;
    }
    }
    onTwoStar(){
      
      this.oneStar=false
      this.twoStar=! this.twoStar;
      this.threeStar=false;
      this.fiveStar=false;
      this.fourStar=false
      if( this.twoStar){
        this.nbrStars=2;
    }
    }
    onThreeStar(){
      
      this.oneStar=false
      this.twoStar=false
      this.threeStar=!this.threeStar;
      this.fiveStar=false;
      this.fourStar=false
      if( this.threeStar){
        this.nbrStars=3;
    }
    }
    onFourStar(){
      
      this.oneStar=false
      this.twoStar=false
      this.threeStar=false
      this.fiveStar=false;
      this.fourStar=!this.fourStar
      if( this.fourStar){
        this.nbrStars=4;
    }
    }
    onFiveStar(){
      
      this.oneStar=false
      this.twoStar=false
      this.threeStar=false
      this.fiveStar=!this.fiveStar;
      this.fourStar=false
      if(this.fiveStar){
        this.nbrStars=5;
    }
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
    getReviews(){
      this.categoryService.getRessource("/reviews/"+this.product.id)
      .subscribe(data => 
        {this.reviews = data;
          console.log(this.reviews)
         
        
        },err=>{
          console.log(err);
        })
    }
    onRemoveReview(id_review:number){
      this.categoryService.delete(id_review,"removeReview/").subscribe(data => {this.reviews = data;
        console.log(data)
        setTimeout(() => {
          this.getReviews()
         
        }, 1000);
      },err=>{
        console.log(err);
      })
    }
    favoriteProduct(id_product:number){
      this.isFavorite=!this.isFavorite

      this.categoryService.favoriteProduct(id_product,this.isFavorite)
        
      
    }

    IsFavorite(product_Id :number){
      let data =  localStorage.getItem('wishlist')
      if(data){
        this.wishlist_product=JSON.parse(data)
        const index = this.wishlist_product.indexOf(product_Id);
        if(index !==-1){
          this.isFavorite = true
        }

      }

    }

    onAddToCart(idProduct:number,quantity:number){
      this.caddyService.addItemToCart(idProduct,quantity);
      }


  }


