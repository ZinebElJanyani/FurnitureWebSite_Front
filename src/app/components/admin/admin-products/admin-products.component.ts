import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DurationPipe } from './duration.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
isProductActive=false;
activeLi=0
isexpended=false
notification:any
outOfStock=0
newOrders=0
duration=0
isProExpended=false

constructor(public authService:AuthService,private router: Router){}
 
ngOnInit(): void {
  this.getNotifications()
  const interval$ = interval(1200000);

  interval$.subscribe(() => this.getNotifications());
  }


  getNotifications(){
    this.authService.getRessource("notifications/"+this.authService.userAutenticated.id).subscribe(
      (data)=>{
       this.notification=data
       this.outOfStock = this.notification[0]
       this.newOrders = this.notification[1]
       this.duration = this.notification[2]

     
      }
    )
  }
onNotificationsClick(){
  this.isexpended=!this.isexpended
 this.getNotifications()
}

onLogout(){
  this.authService.logout();
  this.router.navigate(['/']);

}
}
