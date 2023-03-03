import { map } from 'rxjs';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  collections:any;
  produits:any;
 products: Products[]=[]
 numProducts:number;
 isFavorite:boolean[]=[];
 CurentCtg:any
 
  
  constructor(public categoryService:CategoryService,private route:ActivatedRoute,private router:Router){
    this.numProducts=0;
   
    //The fill() method is a built-in method in JavaScript that fills all the elements of an array with a specified value
    this.isFavorite = new Array(this.products.length).fill(false);
    
  }
  ngOnInit(): void {
    this.getCategories()
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let p1 = this.route.snapshot.params['p1']
    if(p1==1){
      this.CurentCtg = undefined
      this.getProducts("/selected_P")
     
    }else if (p1==2){
      let p2 = this.route.snapshot.params['p2']
      this.getProducts("/products_catg/"+p2)
     
    }
      }
    })
    
  }
 
 
  favorite(i:number){
    this.isFavorite[i] = !this.isFavorite[i];
    console.log(this.isFavorite[i])
  }

  getCategories() {
    
    this.categoryService.getRessource("/collections")
    .subscribe(data => 
      {this.collections = data;
      
      },err=>{
        console.log(err);
      })
  }
  getProducts(url:String){
    this.categoryService.getRessource(url)
    .subscribe(data => 
      {this.produits = data;
        
      
      },err=>{
        console.log(err);
      })
  }
  curentCatg(c:any){
    this. CurentCtg = c
    
  }
 /* getProducts() {
    this.categoryService.getRessource("/selected_P")
    .subscribe((data:any) => 
      {
        
        this.products = data.map((product: any) => {
          return {
            id: product.id,
            nom: product.nom,
            description: product.description,
            price: product.price,
            qteStock: product.qteStock,
            promotion: product.promotion,
            created_at: product.created_at,
            style: product.style,
            color: product.color,
            material: product.material,
            selected: product.selected,
            category: {
              id: product.category.id,
              title: product.category.title
            },
            images:product.images.map((image : any)=>{
              return {
                id: image.id,
                imagePath: image.imagePath
              };
            })
          };
        });
        this.numProducts = this.products.length
      },err=>{
        console.log(err);
      })
        
        
      
     
  }*/
}

interface Products{
  id: number;
  nom: string;
  description: string;
  price: number;
  qteStock: number;
  promotion: number;
  created_at: Date | null;
  style: string | null;
  color: string;
  material: string;
  selected: boolean;
  category: {
    id: number;
    title: string;
  };
  images: {
    id: number;
    imagePath: string;
  }[];
}