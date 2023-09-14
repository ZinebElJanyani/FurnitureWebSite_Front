import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(public authService:AuthService,private http:HttpClient) { }

  showRegions(){
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  return this.http.get("http://localhost:8084/api/command/showRegions",{headers})
}

showCities(idR:number){
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  return this.http.get("http://localhost:8084/api/command/showCity/"+idR,{headers})
  }


createDeliveryAddress(idCity:number, address:string,isSaved:boolean){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });

  let body = {
    'address': address,
    'idC':this.authService.userAutenticated.id,
    'isSaved':isSaved}
  
  return this.http.post("http://localhost:8084/api/command/createAddress/"+idCity,body,{headers})
  
  }
  createCommand(idAdress:number,phone:string,email:string,paymentMethod:string,name:string,deliveryDate:Date,withAssembly:boolean,assemblyPrice:number,totalPrice:number,deliveryPrice:number,couponDiscount:number){
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
    const headers = new HttpHeaders({
      'Authorization': authToken,
      'Content-Type': 'application/json'
    });
    let commandState=1
    if(paymentMethod=="Cash"){
       commandState=0
      }
    
    let body = {
      'ref': null,
      'date':new Date(),
      'phone':phone,
      'email':email,
      'paymentMethod':paymentMethod,
      'name':name,
      'commandState':commandState,
      'deliveryDate':deliveryDate,
      'withAssembly':withAssembly,
      'assemblyPrice':assemblyPrice,
      'deliveryPrice':deliveryPrice,
      'totalPrice':totalPrice,
      'couponDiscount':couponDiscount
    
    }
    
    return this.http.post("http://localhost:8084/api/command/create/"+idAdress,body,{headers})
    
    }

    createPaymentCard(idCommande:number, name:string,cardNumber:string,CVC:string){
      const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
      const headers = new HttpHeaders({
        'Authorization': authToken
      });
    
      let body = {
        'name': name,
        'cardNumber':cardNumber,
        'CVC':CVC}
      
      return this.http.post("http://localhost:8084/api/command/createCreditCard/"+idCommande,body,{headers})
      
      }

      getCommand(){
        const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
        const headers = new HttpHeaders({
          'Authorization': authToken
        });
       
        return this.http.get("http://localhost:8084/api/command/getCommand/"+this.authService.userAutenticated.id,{headers})
      }

    exportPdfProduct(commandId:number){
      const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
      const headers = new HttpHeaders({
        'Authorization': authToken
      });
        return this.http.get("http://localhost:8084/api/command/getInvoice/"+commandId,{headers,responseType: 'blob'})
    }
    
    public getRessource(url : String){
      const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
      const headers = new HttpHeaders({
        'Authorization': authToken
      });
      return this.http.get("http://localhost:8084/api/command/"+url,{headers})
    }

    changeState(commandState : string,idCommande:number){
       
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
    const headers = new HttpHeaders({
      'Authorization': authToken
    });
    const options = {
      params: {
        state: commandState
       
      }
    };
    
    return this.http.post("http://localhost:8084/api/command/changeState/"+idCommande,null,{headers, params: options.params})
    
    }
}
