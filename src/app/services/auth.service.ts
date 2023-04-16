
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, reduce, throwError } from 'rxjs';
import {} from 'jwt-decode';
import { NonNullAssert } from '@angular/compiler';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(true);
  isAuthenticated$ = this._isAuthenticated.asObservable();
  private _isRegisterd = new BehaviorSubject<boolean>(true);
  isRegisterd$ = this._isRegisterd.asObservable();

   userAutenticated={
    id:0,
    name:"",
    phone:"",
    birthday:"",
    created_at:"",
    email:"",
    username:"",
    role:"",
    token :{
      acces_token:"",
      refresh_token:""
    }
  };
  token ={
    acces_token:"",
    refresh_token:""
  };
  
  constructor(private http:HttpClient,private router : Router) { 
    this._isAuthenticated.next(false);
  
  }

  login(name? : string,password?:string){
    if(name && password){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('email', name)
      .set('password',password);

    this.http.post('http://localhost:8084/login', body.toString(), { headers })

    .subscribe((response:any) => {
      this._isAuthenticated.next(true);

  
      this.token = response
     
      localStorage.setItem('access_token',this.token.acces_token);
      localStorage.setItem('isAuthenticated',"true");
      this.getuserProfile(this.token)
      
      alert("login Success");
      this.getUserInfo_JWT();
      this.createCaddyForCostomer(this.token.acces_token);
    
      
      //this.router.navigate(['/courses']);
    },
    (err:HttpErrorResponse)=>
    { this._isAuthenticated.next(false);
      localStorage.setItem('isAuthenticated',"false");
    }
    );
  }
  }
  setUser(){
    localStorage.setItem('user',JSON.stringify(this.userAutenticated));
  }

  loadUser(){
    let value = localStorage.getItem('user')
    if(value!=null){
    let userData = JSON.parse(value)
      if(userData!=null){
        this.userAutenticated=userData
        
    }
  }
  return
    
  }

  getUserInfo_JWT(){
    
    let jwt= localStorage.getItem('access_token');
  if(jwt){
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    this.userAutenticated.username=decodedJwtData.sub;
    this.userAutenticated.role=decodedJwtData.roles;
   // console.log('name: ' + decodedJwtData.sub)
   // console.log('role: ' + decodedJwtData.roles)


  }
}

 getRegistredUsers() : Observable<string[]> {
  return this.http.get("http://localhost:8084/api/UserAccount/usersRegistred")
  .pipe(
    map((resultData: any) => resultData)
  );
}

singUp( name?:string,email?:string,password?:string,phone?:string,birthDay?:string){
 
  let bodyData = {
    "name":name,
    "password":password,
    "email":email,
    "phone":phone,
    "role":"customer",
    "birthday":birthDay,
    "created_at":new Date()
  };
  this.http.post("http://localhost:8084/api/UserAccount/register",bodyData,{responseType: 'text'})
   .subscribe((resultData: any)=>
    {
      this._isRegisterd.next(true);
      if(email)
      this.userAutenticated.username=email
        alert("Registration successful! Thank you for registering with us"+ name+", Your account has been created and you can now log in and start using our services.");
        
    },(err:HttpErrorResponse)=>
    { this._isRegisterd.next(false);
    });
}

createCaddyForCostomer(accesstoken:string){
  const authToken = 'Bearer ' + accesstoken; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  this.http.post("http://localhost:8084/api/caddy/create/"+this.userAutenticated.email,null,{headers,responseType: 'text'})
  .subscribe(data => 
    {
      console.log("caddy is created")
    
    },err=>{
      console.log(err);
    })
}

 getuserProfile(rtoken:any){
  const authToken = 'Bearer ' + rtoken.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });

  this.http.get("http://localhost:8084/api/UserAccount/profile",{headers,responseType: 'text'})
  .subscribe((data:any) => 
    {
      this.userAutenticated= JSON.parse(data);
      this.userAutenticated.token=rtoken;
      setTimeout(() => {
        this.setUser();
      }, 500);
      
    
    },err=>{
      console.log(err);
    })
 }

 logout(){
  this._isAuthenticated.next(false);
  this.userAutenticated = {
    id: 0,
    name: "",
    phone: "",
    birthday: "",
    created_at: "",
    email: "",
    username: "",
    role: "",
    token: {
      acces_token: "",
      refresh_token: ""
    }
     }
     localStorage.setItem('access_token',"");
     localStorage.setItem('isAuthenticated',"false");
     localStorage.setItem('user',JSON.stringify(null));
 }

 updateUser(name?:string,phone?:string,email?:string,date?:Date){

  let bodyData = {
    "id":this.userAutenticated.id,
    "name":name,
    "phone":phone,
    "email":email,
    "birthday":date,
    
  };
  const authToken = 'Bearer ' + this.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });
  return this.http.put("http://localhost:8084/api/UserAccount/edit",bodyData,{responseType: 'text',headers})
   
}
uploadImageUser(file:File){
  let formData:FormData = new FormData();
  formData.append('file',file);
  const authToken = 'Bearer ' + this.userAutenticated.token.acces_token; 

  const req=new HttpRequest('POST',"http://localhost:8084/api/UserAccount/uploadImageUser/"+this.userAutenticated.id,formData,{
    reportProgress:true,
    responseType:'text',
    headers:new HttpHeaders({'Authorization': authToken})
  })
  return this.http.request(req)
}
}
