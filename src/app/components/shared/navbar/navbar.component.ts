import { Router } from '@angular/router';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isActive;
  mobileSize;
  dropDclick=false;

  constructor(router:Router) { 
    this.isActive = false;
    this.mobileSize = false;
  }

  ngOnInit(): void {
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

 
}
