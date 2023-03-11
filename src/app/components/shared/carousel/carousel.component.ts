import { Component, Input, OnInit } from '@angular/core';
interface carouselImage{
  src:String;
  
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{
ngOnInit(): void {
  if(this.autoSlide){
    this.autoSlideImages();
  }
}
  autoSlideImages() {
    setInterval(()=>{
      this.onNext();
    },this.slideInterval);
  }

  @Input() images:String[] = []
  @Input()indicators=true;
  @Input()controls=true;
  @Input()autoSlide =true;
  @Input()slideInterval=3000;
  @Input()animation=true;
  @Input()selectedIndex = 0;

isEnter=false

onEnter(){
  this.isEnter=true;

}
onLeave(){
  this.isEnter=false;

}

selectImg(index:number):void{
  this.selectedIndex = index;
}

onPrev():void{
  if(this.selectedIndex==0){
    this.selectedIndex=this.images.length-1;
  }else{
    this.selectedIndex-=1;
  }
}
onNext(){
  if(this.selectedIndex==this.images.length-1){
    this.selectedIndex=0;
  }else{
    this.selectedIndex+=1;
  }
}



}

