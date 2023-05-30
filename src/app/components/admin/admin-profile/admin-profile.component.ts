import { HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{
  
  profileForm:any
  UserImgForm:any
  imagePath: any;
  progress=0;
  selectedFile: any;
  currentFileUpload: any;

  constructor(public authService:AuthService){}

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
        phone:new FormControl(this.authService.userAutenticated.phone),
    })
  }
  get name(){
    return this.profileForm.get('name');
  }
  get email(){
    return this.profileForm.get('email');
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
  this.authService.updateUser(this.profileForm.value.name,this.profileForm.value.phone,this.profileForm.value.email)
  .subscribe(data =>  {
    
    let result =JSON.parse(data)
    this.authService.userAutenticated.name =result.name
    this.authService.userAutenticated.email = result.email
    this.authService.userAutenticated.phone = result.phone
    this.authService.setUser()
   },err=>{
     console.log(err);
   })
  }

  
}
