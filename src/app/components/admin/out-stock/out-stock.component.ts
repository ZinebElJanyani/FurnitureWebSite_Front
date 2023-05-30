import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-out-stock',
  templateUrl: './out-stock.component.html',
  styleUrls: ['./out-stock.component.css']
})
export class OutStockComponent implements OnInit {
  products:any
  productId=0
  showConfirmationDialog=false;
  productForm:any

  constructor(private categoryService:CategoryService){}
  
  ngOnInit(): void {
    this.getProducts()
  }

  initilizeForm() {
    this.productForm=new FormGroup({
      qteStock:new FormControl("",Validators.required)})
  }
  get qteStock(){
    return this.productForm.get('qteStock');
  }
getProducts(){
  this.categoryService.getRessource("/outOFstock").subscribe(data=>{
    this.products = data
    
  },err =>{
    console.log(err)
  })
}
displayProducts(){
  this.getProducts()
  setTimeout(()=>{   
    $('#products-list').DataTable( {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      responsive : true,
      lengthMenu : [3, 5, 10]
  } );
  }, 1000);
}



onEditProduct(idProduct:number,value : Text){
this.categoryService.saveProductQuantity(idProduct,value)
}

openConfirmationDialog(prodID:number) {
  
  this.productId = prodID
  this.showConfirmationDialog = true;
  console.log(this.showConfirmationDialog)
  this. initilizeForm() 

}

onSubmit(){
  this.categoryService.saveProductQuantity(this.productId,this.productForm.value.qteStock).subscribe(
    err=>{
    console.log(err);
  })
    
    setTimeout(() => {
      this.getProducts()
      this.showConfirmationDialog = false
    }, 2000);
 
}

closeConfirmationDialog() {
  this.showConfirmationDialog = false;
}
}
