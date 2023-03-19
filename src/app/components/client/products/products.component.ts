import { CaddyService } from './../../../services/caddy.service';
import { debounceTime, fromEvent, map } from 'rxjs';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

declare var $:any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  @ViewChild('progress') progresstElement?: ElementRef;
  @ViewChild('min') minRange?: ElementRef;
  @ViewChild('max') maxRange?: ElementRef;
  @ViewChild('searchValue') searchInputRef?: ElementRef;
  collections:any;
  produits:any;
 products: Products[]=[]
 numProducts:number;
 isFavorite:boolean[]=[];
 CurentCtg:any
 currentCollect:any
 minPrice:number
 maxPrice:number
 priceGrap:number=500
  product:Products
  modalCartQuantity=0;
  

  constructor(private renderer: Renderer2,public categoryService:CategoryService,private route:ActivatedRoute,private router:Router,private CaddyService:CaddyService){
    this.numProducts=0;
  this.minPrice=0;
  this.maxPrice = 10000;
    this.product = {
      id:0,
      nom: 'Default product name',
    description: 'Default product description',
    price: 0,
    qteStock: 0,
    promotion: 0,
    created_at: null,
    style: null,
    color: '',
    material: '',
    selected: false

    }
    //The fill() method is a built-in method in JavaScript that fills all the elements of an array with a specified value
    this.isFavorite = new Array(this.products.length).fill(false);
    /**** */
    
  }

  loadProducts(min:number,max:number){
        let p1 = this.route.snapshot.params['p1']
    if(p1==1){
      this.CurentCtg = undefined
      this.getProducts("/selected_P/"+min+"/"+max)
     
    }else if (p1==2){
      let p2 = this.route.snapshot.params['p2']
      this.getProducts("/products_catg/"+p2+"/"+min+"/"+max)
     
    }
      
  }
  ngOnInit(): void {
    this.getCategories()
    this.loadProducts(0,10000)
    this.router.events.subscribe((val)=>{
     
      if(val instanceof NavigationEnd){
        let p1 = this.route.snapshot.params['p1']
    if(p1==1){
      this.CurentCtg = undefined
      this.getProducts("/selected_P/0/10000")
     
    }else if (p1==2){
      let p2 = this.route.snapshot.params['p2']
      this.getProducts("/products_catg/"+p2+"/0/10000")
     
    }
      }
    })
    /***** */
    
  }
 
  ngAfterViewInit() {
    if(this.searchInputRef){
      
    fromEvent(this.searchInputRef.nativeElement, 'input')
    
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.categoryService.getRessource("/Find-product/"+this.searchInputRef?.nativeElement.value)
        .subscribe(data => 
          {this.produits = data;
            
          
          },err=>{
            console.log(err);
          })
      });
    }
  }
  favorite(i:number){
    this.isFavorite[i] = !this.isFavorite[i];
    
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
  OnheaderClick(collection:any){
      this.currentCollect  = collection
  }
  onRangeMinChange(event:Event){
    let rangeElement = event.target as HTMLInputElement
    this.minPrice = Number( rangeElement.value)
    let leftrate = (this.minPrice/Number(rangeElement.max))*100;
    
     if(this.maxPrice-this.minPrice<this.priceGrap){
      rangeElement.value = String(this.maxPrice-this.priceGrap)
      this.minPrice=Number( rangeElement.value)
     }else{
      this.loadProducts(this.minPrice,this.maxPrice)
    this.renderer.setStyle(this.progresstElement?.nativeElement,'left',leftrate+"%")
     }
  }
  onRangeMaxChange(event2:Event){
   
    let rangeElement2 = event2.target as HTMLInputElement
    this.maxPrice = Number( rangeElement2.value)
   
    let rightrate =((this.maxPrice/Number(rangeElement2.max))*100);
    if(this.maxPrice-this.minPrice<this.priceGrap){
      rangeElement2.value = String(this.minPrice+this.priceGrap)
      this.maxPrice = Number( rangeElement2.value)
     }else{
      this.loadProducts(this.minPrice,this.maxPrice)
    this.renderer.setStyle(this.progresstElement?.nativeElement,'right',100-rightrate+"%")
  }
}
onInputMinChange(event :Event){
 
  let inputElement = event.target as HTMLInputElement
  this.minPrice = Number( inputElement.value)
  
  if((this.maxPrice-this.minPrice>=this.priceGrap)&& this.maxPrice<= 10000){
    this.renderer.setProperty(this.minRange?.nativeElement,'value',String(this.minPrice))
    this.loadProducts(this.minPrice,this.maxPrice)
    let leftrate = (this.minPrice/10000)*100;
    this.renderer.setStyle(this.progresstElement?.nativeElement,'left',leftrate+"%")
  }
  
}
onInputMaxChange(event :Event){
  
  let inputElement = event.target as HTMLInputElement
  this.maxPrice = Number( inputElement.value)
  if((this.maxPrice-this.minPrice>=this.priceGrap)&& this.maxPrice<= 10000){
    this.loadProducts(this.minPrice,this.maxPrice)
    this.renderer.setProperty(this.maxRange?.nativeElement,'value',String(this.maxPrice))
    let rightrate = (this.maxPrice/10000)*100;
    this.renderer.setStyle(this.progresstElement?.nativeElement,'right',100-rightrate+"%")
  }
}

openModelopen(prd :any){
  console.log("koko")
  $('#productModal').modal('show')
  this.product = prd
}
openModelclose(){
  console.log("lolo")
  $('#poupupImg').modal('hide')
}

onAddToCart(idProduct:number,quantity:number){
this.CaddyService.addItemToCart(idProduct,quantity);
}

onInputChange(event:Event){
this.modalCartQuantity=Number( (event.target as HTMLInputElement).value)
console.log(this.modalCartQuantity);
}
/*OnSearchValueChange(vl:String){
    this.categoryService.getRessource("/Find-product/"+vl)
    .subscribe(data => 
      {this.produits = data;
        
      
      },err=>{
        console.log(err);
      })
}*/
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
  
}