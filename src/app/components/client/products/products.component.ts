import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  isFavorite=false;
  favorite(){
    this.isFavorite = !this.isFavorite;
  }
}
