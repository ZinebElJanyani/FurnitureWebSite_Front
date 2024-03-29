import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams,HttpRequest } from '@angular/common/http';
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
getValues(url:String){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  return this.http.get("http://localhost:8084/api/"+url,{headers})
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

  delete(id : number, url:string){

    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
    const headers = new HttpHeaders({
      'Authorization': authToken
    });
  
 
    
    return this.http.delete("http://localhost:8084/api/products/"+url+id,{headers})
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
 getIntialsFavoriteProducts_fromDB(){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
   this.http.get(this.host+"/favoriteProducts/"+this.authService.userAutenticated.id,{ headers})
   .subscribe((data: any )=> {
    if(data.length>0){
      for (let index = 0; index < data.length; index++) {
        this.favoriteProduct(data[index].id,true) ;
        
      }
      
    }
   },err =>{
     console.log(err)
   }) 
 
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
  console.log(this.authService.userAutenticated.id)

  console.log(this.authService.userAutenticated.token.acces_token)
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  return this.http.post("http://localhost:8084/api/products/addFavorite/"+this.authService.userAutenticated.id,null,{headers, params: options.params})
 }

 createCatg(title:string,idCollection:string,idCat:number){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  let body = {
    "id":idCat,
    "title":title,
    "collection":idCollection
  }
  return this.http.post("http://localhost:8084/api/products/newCategory/",body,{headers})
 }

 uploadProductImg(deletedP:number[],files:File[],productId:number){
  
  let formData = new FormData();

     
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

console.log("formdata:"+formData)
console.log("list:"+deletedP.length)
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  
 
   const parameter = new HttpParams( {
      fromObject:{ dimgs: deletedP }
    })

  const req=new HttpRequest('POST',"http://localhost:8084/api/products/uploadImageProduct/"+productId,formData,{
    reportProgress:true,
    responseType:'text',
    headers:new HttpHeaders({'Authorization': authToken}),
    params: parameter
  })
  return this.http.request(req)
}
 addNewProduct(idP:number,nom:string,description:string,idCat:number,price:number,qteStock:number,color:string,selected:boolean,promotion:number){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  let body = {
    "id":idP,
    "nom":nom,
    "description":description,
    "price":price,
    "qteStock":qteStock,
    "promotion":promotion,
    "created_at":new Date(),
    "style":null,
    "color":color,
    "material":null,
    "selected":selected,
    "categoryId":idCat
  }
 
  return this.http.post("http://localhost:8084/api/products/new",body,{headers})
 }

 saveProductQuantity(id:number,value:Text){
  const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken,
    'Content-Type': 'text/plain'
  });

  return this.http.post(this.host+"/feedStock/"+id,value,{headers})
 
  
 }
 
}

