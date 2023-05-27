import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { Console } from 'console';
//import * as $ from 'jquery';

/*declare global {
  interface Window {
    $: typeof $;
  }
}*/
@Component({
  selector: 'app-category-managment',
  templateUrl: './category-managment.component.html',
  styleUrls: ['./category-managment.component.css']
})
export class CategoryManagmentComponent implements OnInit {

  isInputActive=false;
  isopen=false;
  selectedValue="";
  isOptionSelected=0;
  collections:any
  categoryForm:any
  isSuccess=false;
  categories:any;
  message=""
  idCat=0
  showConfirmationDialog = false;

  constructor(private categoryService:CategoryService,){
    this.categoryForm=new FormGroup({
      title:new FormControl("",Validators.required),})
  }
  get title(){
    return this.categoryForm.get('title');
  }
  
  ngOnInit(): void {
    this.getCollections()
    this.loadCategories();
    
  }
  onInputBlur(value:String){
    if(value===""){
      this.isInputActive=false;
    }else{
      this.isInputActive=true;
    }
  }
  onOptionClick(value:string,i:number){
    this.selectedValue = value;
    this.isOptionSelected = i;
   // window.$ = $;
  }

 getCollections(){
  this.categoryService.getRessource("/collections").subscribe((data)=>{
    this.collections = data
  })
 }

 getCategories(){
  this.categoryService.getRessource("/categories").subscribe((data)=>{
    this.categories = data
  },(err)=>{
    console.log(err)
  })
 }
  loadCategories(){
    this.getCategories()
    setTimeout(()=>{   
      $('#page-length-option').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        responsive : true,
        lengthMenu : [3, 5, 10]
    } );
    }, 1000);
          
  }

  Fcategory(){
    if(this.categoryForm.valid && this.selectedValue!=""){
     this.categoryService.createCatg(this.categoryForm.value.title,this.selectedValue,this.idCat).subscribe((data)=>{
      this.categoryForm.reset()
      let word=(this.idCat ==0)? "added":"updated";
      this.message = "Success! The new category has been "+word+" with success."
      this.isSuccess=true
      setTimeout(() => {
        this.isSuccess=false
        this.getCategories()
      }, 5000);
      
     
     },(err)=>{
      console.log(err);
     });
    }else{
      alert("You need to fil all required fields")
    }
  }

  onEditCat(id:number,title:string,collection:string){
    this.idCat = id
    this.selectedValue = collection;
    this.categoryForm.get('title').setValue(title);
 
    this.isInputActive = true
  }

  openConfirmationDialog(id:number) {
    this.idCat = id
    this.showConfirmationDialog = true;
  }

  closeConfirmationDialog() {
    this.showConfirmationDialog = false;
  }

  onDeleteCat(){
    
    this.categoryService.delete(this.idCat,"dropCategory/").subscribe(data => {let result = data;
      console.log(data)
      if(result==1){
        this.closeConfirmationDialog()
        
       
        setTimeout(() => {
          alert("Success! The new category has been deleted with success.")
          this.getCategories()
         
        }, 1000);
      }
      else{
        this.closeConfirmationDialog()
        setTimeout(() => {
          alert("Sorry, you cannot delete this category as it is already associated with one or more products. Please remove the associated products before attempting to delete the category.")
          
         
        }, 1000);
       
      }
    },err=>{
      console.log(err);
    })
  }
  

}
