import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

products:any
showConfirmationDialog=false
idProduct=0
constructor(private categoryService:CategoryService,private router: Router){}

ngOnInit(): void {
  this.displayProducts()
}

getProducts(){
  this.categoryService.getRessource("/show").subscribe(data=>{
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

openConfirmationDialog(id:number) {
  this.idProduct = id
  this.showConfirmationDialog = true;
}

closeConfirmationDialog() {
  this.showConfirmationDialog = false;
}

ondeleteProduct(){
  this.categoryService.delete(this.idProduct,"removeProduct/").subscribe(data => {let result = data;
    console.log(data)
    if(result==1||result==0){
      this.closeConfirmationDialog()
      
     
      setTimeout(() => {
        alert("Success! The product has been deleted with success.")
        this.getProducts()
       
      }, 1000);
    }
    else{
      this.closeConfirmationDialog()
      setTimeout(() => {
        alert("Sorry, you cannot delete this product as it is already associated with one or more items.")
        
       
      }, 1000);
     
    }
  },err=>{
    console.log(err);
  })
}

onEditProduct(idProduct:number){

  this.router.navigate(['/admin/products',idProduct])
}


}
