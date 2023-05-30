import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-managment',
  templateUrl: './product-managment.component.html',
  styleUrls: ['./product-managment.component.css']
})
export class ProductManagmentComponent implements OnInit{
  @ViewChild('image') private image: ElementRef | undefined;
  @ViewChild('inputFile') fileInput: ElementRef |undefined;

  isInputActive:boolean[]=[];
  productImgs:File[]=[]
  productForm:any
  categories:any
  isShow=false
  colors= [ "Ivory",
    "Orange",
    "White",
    "Blue",
    "Pink",
    "Beige",
    "Gray",
    "Black",
    "Gold",
    "Green",
    "Red"]
    product={
      id : 0,
      nom : "" ,
      description : "" ,
      price : "",
      qteStock : "",
      promotion : 0,
      created_at : "",
      style : null,
      color :  "" ,
      material : null,
      selected : false,
      categoryId : 0,
      categorytitle :  "" 
    }
    idProduct:number=0
    images_product: any[] = [];
    deleted_images: number[] = [];
  constructor( private router:Router,private sanitizer: DomSanitizer,private route:ActivatedRoute,private el: ElementRef, private renderer: Renderer2,private categoryService:CategoryService){
    
  }
  ngOnInit(): void {
   this.idProduct = this.route.snapshot.params['id']

    this. getCategories()
    this.getProduct()
   

    setTimeout(() => {
      this.initilizeForm()
      this.initilizeLabels()
    }, 1000);
   
  }
  initilizeForm(){
    this.productForm=new FormGroup({
      name:new FormControl(this.product.nom,Validators.required),
      description:new FormControl(this.product.description,Validators.required),
      price:new FormControl(this.product.price,[Validators.required,Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      promotion:new FormControl(this.product.promotion),
      qteStock:new FormControl(this.product.qteStock,Validators.required),
      color:new FormControl(this.product.color),
      selectProduct:new FormControl(this.product.selected),

      category:new FormControl(this.product.categoryId,Validators.required),

    
    })
  }
  get name(){
    return this.productForm.get('name');
  }
  get description(){
    return this.productForm.get('description');
  }
  get price(){
    return this.productForm.get('price');
  }
  get promotion(){
    return this.productForm.get('promotion');
  }
  get color(){
    return this.productForm.get('color');
  }
  get qteStock(){
    return this.productForm.get('qteStock');
  }
  get category(){
    return this.productForm.get('category');
  }
  get selectProduct(){
    return this.productForm.get('selectProduct');
  }

  
  onInputBlur(value:String,index:number){
    
  
    if(value===""){
      
      this.isInputActive[index]=false;
    }else{
      this.isInputActive[index]=true;
    }
  }

  onSubmit(){
    if(this.productForm.valid){
      
    this.categoryService.addNewProduct(this.idProduct,this.productForm.value.name,this.productForm.value.description,this.productForm.value.category,this.productForm.value.price,this.productForm.value.qteStock,this.productForm.value.color,this.productForm.value.selectProduct,this.productForm.value.promotion).subscribe(
      data => {
      
        let idProduct:number = Number(data)
        this.isShow=true
        setTimeout(() => {
          this.categoryService.uploadProductImg(this.deleted_images,this.productImgs,idProduct).subscribe(data=>{
            })
            this.isShow=false
            this.router.navigate(['/admin/products',0])
            this.productForm.reset()
           
           /* const elements = this.el.nativeElement.querySelectorAll('li.list');
              for (let i = 0; i < elements.length; i++) {
                this.renderer.removeChild(elements[i].parentNode, elements[i]);
              }*/
        }, 3000);
        
      },err =>{
        console.log(err)
      }
    )}
  }
  onSelectedFile(event:Event){

    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files!=null && files.length > 0) {
      const productImage = files[0];
      this.productImgs.push(productImage);
      console.log(this.productImgs[0])
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        
        const li: HTMLLIElement = this.renderer.createElement('li');

        const img: HTMLImageElement = this.renderer.createElement('img');
        const i: HTMLImageElement = this.renderer.createElement('i');
        if(reader?.result?.toString())
        img.src = reader?.result?.toString();
        this.renderer.addClass(img, 'product-image');
        this.renderer.addClass(li, 'list');

        const a: HTMLAnchorElement = this.renderer.createElement('a');
        this.renderer.addClass(a, 'delete-btn');
        a.addEventListener('click', this.deleteProductImage.bind(this, productImage, a,0));
        
        i.innerText = 'delete_forever';
        this.renderer.addClass(i, 'material-icons');


        this.renderer.appendChild(this.image?.nativeElement, li);
        this.renderer.appendChild(li, a);
        this.renderer.appendChild(li, img);
        
        this.renderer.appendChild(a, i);

       
      });
  
      // Read the selected file as a data URL
      reader.readAsDataURL(productImage);
    }    
  }

  deleteProductImage(filename:any, a:HTMLAnchorElement,indice:number) {
    const index = this.productImgs.indexOf(filename);

   
    if (index !== -1) {
      this.productImgs.splice(index, 1);
      
    }else{
      this.deleted_images.push(indice)
    }
 

     a.parentElement?.remove();
     
  }

  getCategories(){
    this.categoryService.getRessource("/categories").subscribe((data)=>{
      this.categories = data
      

    },(err)=>{
      console.log(err)
    })
  }

  getProduct(){
    
    if(this.idProduct!=0){
      this.categoryService.getRessource("/product/"+this.idProduct).subscribe((data:any) =>{
        this.product =data
        setTimeout(() => {
          this.getProductImages(this.idProduct)
        }, 1000);
      })
    }
  }

  initilizeLabels(){
    if(this.productForm.value.nom!=""){
     this.isInputActive[0]=true
    }
    if(this.productForm.value.description!=""){
      this.isInputActive[1]=true
     }
     if(this.productForm.value.price!=""){
      this.isInputActive[2]=true
     }
     if(this.productForm.value.promotion!=""){
      this.isInputActive[3]=true
     }
     if(this.productForm.value.qteStock!=""){
      this.isInputActive[4]=true
     }
    
  }
  getProductImages( id:number){
    this.categoryService.getRessource("/productP/"+id)
    .subscribe((data: any) => {
     
      data.forEach((image: any) => {
        let base64Image = `data:image/jpeg;base64,`+image;
       // this.images_product2.push(image)
        this.images_product.push(this.sanitizer.bypassSecurityTrustUrl(base64Image));
     
      });
  
      
      
      },err=>{
        console.log(err);
      })
  }

  
  onShowList(){
    this.router.navigate(['/admin/products/list'])
  }
}
