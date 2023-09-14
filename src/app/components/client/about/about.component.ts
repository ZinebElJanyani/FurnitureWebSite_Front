import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private viewportScroller:ViewportScroller){}
  scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
