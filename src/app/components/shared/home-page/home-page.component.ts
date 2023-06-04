import { state,animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component,Inject, OnInit, HostListener, Query, QueryList, Renderer2, ElementRef, ViewChild,ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { } from "module";
import { AuthService } from 'src/app/services/auth.service';
import { CaddyService } from 'src/app/services/caddy.service';
import { CategoryService } from 'src/app/services/category.service';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations:[

    trigger('fade',[
      transition(':enter',[ 
     query("@fade",[
      
      stagger(200, [style({
        position : 'relative',
        display : 'inline-block',
        opacity:0,
        bottom: -20}),
        animate(50000)
        
        
      ])            
     
                
      ])
    ])
    
    
  ])
 /* trigger('openClose', [
    // ...
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '100px',
      opacity: 0.8,
      backgroundColor: 'blue'
    })),
    transition('* => closed', [
      animate('1s')
    ]),
    transition('* => open', [
      animate('0.5s')
    ]),
  ]),*/

]
})
export class HomePageComponent implements OnInit {

  @ViewChild('intro') input_intro?: ElementRef<HTMLInputElement>;
  @ViewChildren('parts') input_logoParts?: QueryList<ElementRef<HTMLInputElement>>;
 
  logo  = document.querySelector('.intro');
  intro = document.querySelector('.logo');
  logoSpan = document.querySelectorAll('.logo-parts');

  T_Active =false;
  A_Active = false;
  C_active=false;
  C_Active: any;

  //section counters
  yearsCount:number=0;
  clientsCount:number=0;
  designersCount:number=0;
  honorsCount:number=0;
  activateCount:boolean=false;
  //video
  isPlay=false;
  collections: any;
  showModalDialog=false;
  couponForm: any;
  applyTransform=false
  istopen=true
  constructor(private viewportScroller: ViewportScroller,private router: Router, public authService: AuthService,private cadyService:CaddyService,private renderer: Renderer2,public categoryService:CategoryService) { 
      
  }

  ngOnInit(): void {
    this.getCategories()
    setTimeout(() => {
      this.input_logoParts?.forEach((span,index) => {
        setTimeout(() => {
          this.renderer.addClass(span.nativeElement,'active');
        }, (index+1)*100);
      });
      setTimeout(() => {
        this.input_logoParts?.forEach((span,index) => {
          setTimeout(() => {
            this.renderer.removeClass(span.nativeElement,'active');
            this.renderer.addClass(span.nativeElement,'fade');
          }, (index+1)*50);
        });
      
      }, 2000);

      setTimeout(() => {
        this.renderer.setStyle(this.input_intro?.nativeElement, 'top', '-100vh');
        setTimeout(() => {
          this.renderer.setStyle(this.input_intro?.nativeElement, 'background', 'white');

        }, 30);
      }, 2400);
    });

  }

  //*********************** */
  /*Images =[
  {
    src:"https://www.livingspaces.com/globalassets/images/lp/2023/01/0123_winder_d.jpg"
  },
  {
    src:"assets/images/home_img/promo1.jpg"
  },
  {
    src:"assets/images/home_img/promo2.jpg"
  },
  {
    src:"assets/images/home_img/promo3.jpg"
  },
  {
    src:"assets/images/home_img/promo4.jpg"
  }
  ]*/
  Images =[
    
    "https://www.livingspaces.com/globalassets/images/lp/2023/01/0123_winder_d.jpg",
   
    "assets/images/home_img/promo1.jpg",
    "assets/images/home_img/promo2.jpg",
    "assets/images/home_img/promo3.jpg",
    "assets/images/home_img/promo4.jpg"
    
    ]

  //Buy by collection

  onTableClick(){
    this.T_Active=!this.T_Active;
  }

  onChestClick(){
    this.C_Active = !this.C_Active;
  }
  onArmoireClick(){
    this.A_Active=!this.A_Active;
  }
 //section counters:
 @HostListener('window:scroll', ['$event'])
  onScroll(e : Event){
    
    if( window.scrollY <3113 && window.scrollY>2400){
      this.activateCount=true;
    }else{
      this.activateCount=false;
    }
    
  }
  
  

 yearsCountStop:any=setInterval(()=>{
  if(this.activateCount){
  this.yearsCount++;}

  if(this.yearsCount==60){
    clearInterval(this.yearsCountStop);
  }
},50)

clientsCountStop:any=setInterval(()=>{
  if(this.activateCount){
  this.clientsCount++;}

  if(this.clientsCount==630){
    clearInterval(this.clientsCountStop);
  }
},10)
designersCountStop:any=setInterval(()=>{
  if(this.activateCount){
  this.designersCount++;}

  if(this.designersCount==40){
    clearInterval(this.designersCountStop);
  }
},50)
honorsCountStop:any=setInterval(()=>{
  if(this.activateCount){
  this.honorsCount++;
  }

  if(this.honorsCount==300){
    clearInterval(this.honorsCountStop);
  }
},10)
  
//video
showVideo(){
  this.isPlay=true;
}
stopVideo(){
  this.isPlay=false;
}
getCategories() {
   
  this.categoryService.getRessource("/collections")
  .subscribe(data => 
    {this.collections = data;
      console.log(data)
    
    },err=>{
      console.log(err);
    })
}

onAddToCart(idProduct:number,quantity:number){
  this.cadyService.addItemToCart(idProduct,quantity);
}

openModal() {
  
  this.showModalDialog = true;
this.initilizeForm() 
}

closeModal() {
  this.showModalDialog = false;
}
initilizeForm() {
  this.couponForm=new FormGroup({
    name:new FormControl(this.authService.userAutenticated.name,Validators.required),
    email:new FormControl(this.authService.userAutenticated.email,Validators.required)})

  }
get name(){
  return this.couponForm.get('name');
}
get email(){
  return this.couponForm.get('email');
}
onSubmit(){
this.istopen = false
this.closeModal()
setTimeout(() => {
  this.istopen=true
}, 5000);
}
scrollToElement(elementId: string): void {
  this.viewportScroller.scrollToAnchor(elementId);
}

}




