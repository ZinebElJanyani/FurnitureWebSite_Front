import { HttpEventType, HttpRequest } from '@angular/common/http';
import { NavbarComponent } from './../navbar/navbar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:any
  UserImgForm:any
  selectedFile: any
  progress=0;
  currentFileUpload: any
  imagePath=""

constructor(public authService:AuthService){
}


ngOnInit(): void {
  this.initilizeFormUser()
  this.initilizeFormImg()
  this.imagePath = 'http://localhost:8084/api/UserAccount/userImage/'+this.authService.userAutenticated.id
}
  initilizeFormImg() {
    this.UserImgForm=new FormGroup({
      photo:new FormControl("",Validators.required),
      
    })
  }

initilizeFormUser(){
  this.profileForm=new FormGroup({
    name:new FormControl(this.authService.userAutenticated.name,Validators.required),
    email:new FormControl(this.authService.userAutenticated.email,Validators.required),
    birthday:new FormControl(this.authService.userAutenticated.birthday),

      phone:new FormControl(this.authService.userAutenticated.phone),
  
  })
}
get name(){
  return this.profileForm.get('name');
}
get email(){
  return this.profileForm.get('email');
}
get birthday(){
  return this.profileForm.get('birthday');
}
get phone(){
  return this.profileForm.get('phone');
}
get photo(){
  return this.UserImgForm.get('photo');
}
imgProfile(){
  this.progress = 0
  this.currentFileUpload = this.selectedFile.item(0)
  this.authService.uploadImageUser(this.currentFileUpload)
  .subscribe(event =>{
      if(event.type=== HttpEventType.UploadProgress){
        if(event!= undefined){
        this.progress = event.total ? Math.round(100*event.loaded / event.total) : 0;
        }
      }else if(event instanceof HttpRequest){
        alert("success")
        

      }
      setTimeout(() => {
        this.imagePath = 'http://localhost:8084/api/UserAccount/userImage/'+this.authService.userAutenticated.id+ '?timestamp=' + new Date().getTime();
      }, 500);
    },err=>{
        console.log(err)
      }
  )
}
onSelectedFile(event:Event){
  const input = event.target as HTMLInputElement;
  this.selectedFile = input.files;

}

Fprofile(){
this.authService.updateCustomer(this.profileForm.value.name,this.profileForm.value.phone,this.profileForm.value.email,this.profileForm.value.birthday)
.subscribe(data =>  {
  
  let result =JSON.parse(data)
  this.authService.userAutenticated.name =result.name
  this.authService.userAutenticated.email = result.email
  this.authService.userAutenticated.birthday = result.birthday
  this.authService.userAutenticated.phone = result.phone
  this.authService.setUser()
 },err=>{
   console.log(err);
 })
}


}
