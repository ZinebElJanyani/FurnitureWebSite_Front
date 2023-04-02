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

  favoriteProduct(productId:number,isfavorite:boolean){
    let data =  localStorage.getItem('wishlist')
    let a=false
    let whichList:number[]=[]
    if(data){
       
      whichList=JSON.parse(data)
        const index = whichList.indexOf(productId);
        if (index !== -1 && !isfavorite){
          whichList.splice(index, 1);
          a=true;

        }else if (index == -1 && isfavorite){
          whichList =[...whichList, productId];
        a=true;
        }

        if(a){
          localStorage.setItem('wishlist',JSON.stringify(whichList));

        }

      }else{
          if(isfavorite){
            whichList =[...whichList, productId];
            localStorage.setItem('wishlist',JSON.stringify(whichList));
          }
      }
  }

  getFavoriteProducts(product_ids:number[]){
  
  const options = {
    params: {
      ids: product_ids
    }
  };
  return this.http.get("http://localhost:8084/api/products/products",{ params: options.params})
 }

 storeFavoriteInDB(){
  let data =  localStorage.getItem('wishlist')
  let whichList:number[]=[]
  if(data){
     
    whichList=JSON.parse(data)
  }

  const options = {
    params: {
      ids: whichList
    }
  };
  console.log(this.authService.userAutenticated.token.acces_token)
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  return this.http.post("http://localhost:8084/api/products/addFavorite/"+this.authService.userAutenticated.id,null,{headers, params: options.params})
 }

}

