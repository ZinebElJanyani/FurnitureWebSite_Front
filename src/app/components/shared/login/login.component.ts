import { LoginValidators } from './LoginValidators';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
/*import { LoginValidators } from '/login.validators';*/
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isRight=false;
  isAUth=false;
  isRegister=false;
  returnUrl="";
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',Validators.required)
  })
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  constructor(private route: ActivatedRoute,fb:FormBuilder,private authService: AuthService,private router : Router,private categoryService:CategoryService){
    /*this.registerForm=fb.group({
      Remail:['',Validators.email,Validators.required],
    Rpassword:['',Validators.required],
    name:['',Validators.required],
    phone:[''],
    birthDay:[''],
    Cpassword:['',[Validators.required]]
    },{validators:LoginValidators.passwordSouldMatch})*/
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  registerForm=new FormGroup({
    Remail:new FormControl('',[Validators.email,Validators.required], (control: AbstractControl) => LoginValidators.shouldBeUnique(control,this.authService)),
    Rpassword:new FormControl('',Validators.required),
    name:new FormControl('',[Validators.required]),
    phone:new FormControl(),
    birthDay:new FormControl(),
    Cpassword:new FormControl('',Validators.required)
  },{validators: LoginValidators.passwordSouldMatch});

  get Remail(){
    return this.registerForm.get('Remail');
  }
  get Rpassword(){
    return this.registerForm.get('Rpassword');
  }
  get name(){
    return this.registerForm.get('name');
  }
  get Cpassword(){
    return this.registerForm.get('Cpassword');
  }
  get birthDay(){
    return this.registerForm.get('birthDay');
  }
  get phone(){
    return this.registerForm.get('phone');
  }
  
  rightClick(){
    this.isRight=true;
   
  }
  leftClick(){
    this.isRight=false;
  }

  Flogin(){
    
      this.authService.login(this.loginForm.value.email?.toString(),this.loginForm.value.password?.toString());
   
    
   
    this.authService.isRegisterd$.subscribe(v=>{this.isAUth=v;})
   
    setTimeout(() => {
   if(this.isAUth==false){

     this.loginForm.reset
      this.loginForm.setErrors({
        invalidLogin:true
      })
  
    }else{
     
      if(this.authService.userAutenticated.role == "admin"){

        this.router.navigate(['charts']);}
        else if(this.authService.userAutenticated.role == "customer"){
          this.router.navigate([this.returnUrl]);
          //register the favorite products for this user in the DB
          setTimeout(() => {
           this.categoryService.getIntialsFavoriteProducts_fromDB();
          }, 2000);
        }
    }
    }, 1000);
   
  }
  Fsignup(){
    this.authService.singUp(this.registerForm.value.name?.toString(),this.registerForm.value.Remail?.toString(),this.registerForm.value.Rpassword?.toString(),this.registerForm.value.phone?.toString(),this.registerForm.value.birthDay?.toString());
    this.authService.isAuthenticated$.subscribe(v=>{this.isRegister=v;})
    setTimeout(() => {
    
   if(this.isRegister==false){
      
     this.loginForm.reset
      this.loginForm.setErrors({
        invalidLogin:true
      })
    }else{
      this.registerForm.reset
      this.leftClick()
      //this.authService.createCaddyForCostomer()
    }
    }, 1000);
  }

 
}

