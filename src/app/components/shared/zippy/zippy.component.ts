import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css']
})
export class ZippyComponent {
  isnotdesplay = true;
  @Input()   title ="nothing";
  @Input()   isOpen =false;
  @Output() headerClick = new EventEmitter()
 
     toggle(){
         this.isnotdesplay = !this.isnotdesplay;
         this.headerClick.emit()
         console.log(this.isOpen)
     }
}
