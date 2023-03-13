import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  constructor(public authService:AuthService) { }
}
