import { map } from 'rxjs';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  collections:any;
 products: Products[]=[]
 
  
  constructor(private categoryService:CategoryService){
    
  }
  ngOnInit(): void {
    this.getCategories()
    this.getProducts()
  }
  
 
  isFavorite=false;
  favorite(){
    this.isFavorite = !this.isFavorite;
  }

  getCategories() {
    this.categoryService.getRessource("/collections")
    .subscribe(data => 
      {this.collections = data;
      
      },err=>{
        console.log(err);
      })
  }
  getProducts() {
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
        console.log(this.products)
      },err=>{
        console.log(err);
      })
        
        
      
     
  }
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