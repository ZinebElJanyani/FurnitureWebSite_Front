import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, reduce, throwError } from 'rxjs';
import {} from 'jwt-decode';
import { NonNullAssert } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(true);
  isAuthenticated$ = this._isAuthenticated.asObservable();
  private _isRegisterd = new BehaviorSubject<boolean>(true);
  isRegisterd$ = this._isRegisterd.asObservable();
   userAutenticated={
    username:"",
    role:"",
    token :{
      acces_token:"",
      refresh_token:""
    }
  };
  
  constructor(private http:HttpClient,private router : Router) { }

  login(name? : string,password?:string){
    if(name && password){
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
      .set('email', name)
      .set('password',password);

    this.http.post('http://localhost:8084/login', body.toString(), { headers })
   /* .pipe(
      catchError(error => {
        // Handle error response
        
        if (error.status === 401) {
          this.isAuthenticated=false;
        } else {
          this.isAuthenticated=false;
          
        }
        return of(null);
      })
    )*/

    .subscribe((response:any) => {
      this._isAuthenticated.next(true);
      
      this.userAutenticated.token = response
      localStorage.setItem('access_token',this.userAutenticated.token.acces_token);
      
      alert("login Success");
      this.getUserInfo_JWT();
      //this.router.navigate(['/courses']);
    },
    (err:HttpErrorResponse)=>
    { this._isAuthenticated.next(false);
    }
    );
  }
  }

  getUserInfo_JWT(){
    
    let jwt= localStorage.getItem('access_token');
  if(jwt){
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    this.userAutenticated.username=decodedJwtData.sub;
    this.userAutenticated.role=decodedJwtData.roles;
    console.log('name: ' + decodedJwtData.sub)
    console.log('role: ' + decodedJwtData.roles)


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
        alert("Registration successful! Thank you for registering with us ,Your account has been created and you can now log in and start using our services.");
        
    },(err:HttpErrorResponse)=>
    { this._isRegisterd.next(false);
    });
}
}
