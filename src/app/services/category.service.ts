import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public host="http://localhost:8084/api/products"
  constructor(private http:HttpClient) { }

  public getRessource(url : String){

    return this.http.get(this.host+url)
  }
}
