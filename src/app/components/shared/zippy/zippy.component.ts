import { Component, Input } from '@angular/core';

@Component({
  selector: 'zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css']
})
export class ZippyComponent {
  isnotdesplay = true;
  @Input()   title ="nothing";
 
     toggle(){
         this.isnotdesplay = !this.isnotdesplay;
     }
}
