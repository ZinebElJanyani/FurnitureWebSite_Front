import { CaddyService } from './../../../services/caddy.service';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 
  isActive;
  mobileSize;
  dropDclick=false;
  isAuthenticated=false

  navCaddyCount=0

  constructor(router:Router,public authservice:AuthService,public caddyService:CaddyService,private categoryService:CategoryService) { 
    this.isActive = false;
    this.mobileSize = false;
    this.authservice.isAuthenticated$.subscribe(v=>{this.isAuthenticated=v;})
    this.caddyService.caddyCount$.subscribe(v=>{this.navCaddyCount=v;})
    
  }

  ngOnInit(): void {
   // this.authservice.isAuthenticated$.subscribe(v=>{this.isAuthenticated=v;})
   let result=localStorage.getItem('isAuthenticated')
   this.isAuthenticated = (result=="true")? true:false
   

  // Listen for changes to the local storage
 /* window.addEventListener('storage', (event) => {
    console.log("2"+this.isAuthenticated);
    if (event.key === 'isAuthenticated') {
      this.isAuthenticated = Boolean(event.newValue);
      console.log("2"+this.isAuthenticated);
    }
  });*/
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e : Event){
    if(window.scrollY < 100){
      this.isActive = false;
    }else{
      this.isActive = true;
    }
    
  }

  onToggle(){
    this.mobileSize=!this.mobileSize;
  }

  onLogout(){
    
   
   this.categoryService.storeFavoriteInDB().subscribe(data => {
             
     },err =>{
       console.log(err)
     }) 

     setTimeout(() => {
      localStorage.removeItem('wishlist');
      this.authservice.logout();
      this.isAuthenticated=false;
     }, 1000);
  }

  onShowCart(){
    this.caddyService.resetCart()
  }
}
