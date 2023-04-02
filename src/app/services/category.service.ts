import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http2ServerRequest } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public host="http://localhost:8084/api/products"

  constructor(private http:HttpClient,public authService:AuthService) { }

  public getRessource(url : String){

    return this.http.get(this.host+url)
  }

  addReview(idProduct:number, nbre_etoile:number,titre:string,text:string,image:string,isRecommanded:boolean,name:String){
    
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
    const headers = new HttpHeaders({
      'Authorization': authToken
    });
    const options = {
      params: {
        costomerId: this.authService.userAutenticated.id,
        productId: idProduct,
       
      }
    };
    let body = {
      "id":null,
      "nbre_etoile":nbre_etoile,
      "titre":titre,
      "text":text,
       "creeA":new Date(),
      "image":image,
      "isRecommanded":isRecommanded,
      "name":name,
      "id_customer":0
    }
    
    return this.http.post("http://localhost:8084/api/products/createReview",body,{headers, params: options.params})
    
  }

  uploadImageReview(file:File,idReview:number){
    let formData:FormData = new FormData();
    formData.append('file',file);
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 

    const req=new HttpRequest('POST',"http://localhost:8084/api/products/uploadImageReview/"+idReview,formData,{
      reportProgress:true,
      responseType:'text',
      headers:new HttpHeaders({'Authorization': authToken})
    })
    return this.http.request(req)
  }

  deleteReview(idReview : number){

    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
    const headers = new HttpHeaders({
      'Authorization': authToken
    });
  
 
    
    return this.http.delete("http://localhost:8084/api/products/removeReview/"+idReview,{headers})
  }
}
