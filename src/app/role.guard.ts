import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService : AuthService,private router: Router){
 
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data?.['expectedRole'];
       const currentUser = this.authService.userAutenticated;
    
    if(currentUser.id ==0 || currentUser.role != expectedRole){
      this.authService.setPreviousUrl(state.url);

      const navigationExtras: NavigationExtras = {
        queryParams: { returnUrl: state.url }
      };
      this.router.navigate(['/login'],navigationExtras);

      return false;

    }
    
      return true;
  }
  
}
