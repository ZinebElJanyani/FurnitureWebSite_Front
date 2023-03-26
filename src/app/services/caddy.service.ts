import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  
  private _caddyCount= new BehaviorSubject<number>(0);
  caddyCount$ = this._caddyCount.asObservable();

  
  constructor(public authService:AuthService,private http:HttpClient) {
    
   }

  addItemToCart(idProduct:number, quantityp:number){
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
    const headers = new HttpHeaders({
      'Authorization': authToken
    });
    const options = {
      params: {
        costomerId: this.authService.userAutenticated.id,
        productId: idProduct,
        quantity:quantityp
      }
    };
    
    this.http.post("http://localhost:8084/api/caddy/addItem",null,{headers, params: options.params})
    .subscribe((data:any) => 
      {
     
        this._caddyCount.next(this._caddyCount.value+1)
      if(data==1){    
          alert("We're sorry, but the quantity of the product you have selected is currently unavailable. Please adjust the quantity in your cart and try again, or consider selecting a similar product that is in stock. Thank you for your understanding. ")
        }
      },err=>{
        console.log(err);
      })
  }

  resetCart(){
    this._caddyCount.next(0)
  }

  showCart(){
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  const options = {
    params: {
      costomerId: this.authService.userAutenticated.id
    }
  };
  return this.http.get("http://localhost:8084/api/caddy/showCart",{headers, params: options.params})
}

deleteItem(productId:number){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
 
  return this.http.delete("http://localhost:8084/api/caddy/deleteItem/"+productId,{headers})
}

updateCaddy(totalPrice?:number,deliveryPrice?:number,coupon?:number){

    let bodyData = {
      "totalPrice":totalPrice,
      "deliveryPrice":deliveryPrice,
      "coupon":coupon,
    };
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
    const headers = new HttpHeaders({
      'Authorization': authToken
    });
    return this.http.put("http://localhost:8084/api/caddy/updateCaddy/"+this.authService.userAutenticated.id,bodyData,{responseType: 'text',headers})
     
}

 showCardInfo(){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  const options = {
    params: {
      costomerId: this.authService.userAutenticated.id
    }
  };
  return this.http.get("http://localhost:8084/api/caddy/showCartInfo",{headers, params: options.params})
 }
}
