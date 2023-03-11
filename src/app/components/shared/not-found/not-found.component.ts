import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  imagePath="http://demo.redbit.com.tw/img/single-product/medium/2.jpg"
  images: any[] = [];
 
  constructor(public categoryService:CategoryService,private sanitizer: DomSanitizer){
    
  }

  OnImgClick(event : Event){
    this.imagePath = ""+(event?.srcElement as HTMLImageElement)?.getAttribute('src')
    
  }

  getProductImages( id:number){
    this.categoryService.getRessource("/productP/"+id)
    .subscribe((data: any) => {
      data.forEach((image: any) => {
       // const bytes = new Uint8Array(image);
       // const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        let base64Image = `data:image/jpeg;base64,`+image;

        this.images.push(this.sanitizer.bypassSecurityTrustUrl(base64Image));
      });
        console.log(this.images)
      
      },err=>{
        console.log(err);
      })
  }
}
