import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { MaterialModule } from './added-modules/material.module';
import { ComponentModule} from './added-modules/component.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/*import { ProfileComponent } from './components/shared/profile/profile.component';*/
import { OrdersComponent } from './components/client/orders/orders.component';
/*import { ZippyComponent } from './shared/zippy/zippy.component';*/







@NgModule({
  declarations: [
    AppComponent,
   
    
    
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService,CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
