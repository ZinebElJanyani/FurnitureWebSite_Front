import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public host="http://localhost:8084/api/chart/"
  constructor(private http:HttpClient,private authService:AuthService) { }

  getRessorces(url:string){
    const authToken = 'Bearer ' + this.authService.userAutenticated.token.acces_token; 
  const headers = new HttpHeaders({
    'Authorization': authToken
  });

  return this.http.get(this.host+url,{headers})
  }
}
