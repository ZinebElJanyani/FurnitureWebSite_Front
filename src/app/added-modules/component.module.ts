import { ZippyComponent } from './../components/shared/zippy/zippy.component';
import { HttpClient } from '@angular/common/http';
import { CarouselComponent } from './../components/shared/carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/shared/navbar/navbar.component';
import { HomePageComponent } from '../components/shared/home-page/home-page.component';
import { FooterComponent } from '../components/shared/footer/footer.component';
import { NotFoundComponent } from '../components/shared/not-found/not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material.module';
import { AdminProductsComponent } from '../components/admin/admin-products/admin-products.component';
import { ShoppingCartComponent } from '../components/client/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from '../components/client/check-out/check-out.component';
import { OrderSuccessComponent } from '../components/client/order-success/order-success.component';
import { LoginComponent } from '../components/shared/login/login.component';
import { ProductsComponent } from '../components/client/products/products.component';
import { ProductDetailComponent } from '../components/client/product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from '../components/client/orders/orders.component';
import { ProfileComponent } from '../components/shared/profile/profile.component';
import { WishlistComponent } from '../components/client/wishlist/wishlist.component';
import { ChartsComponent } from '../components/admin/charts/charts.component';
import { DataTablesModule } from 'angular-datatables';
import { ProductManagmentComponent } from '../components/admin/product-managment/product-managment.component';
import { CategoryManagmentComponent } from '../components/admin/category-managment/category-managment.component';
import { SwitAlertComponent } from '../components/admin/swit-alert/swit-alert.component';
import { ProductListComponent } from '../components/admin/product-list/product-list.component';
import { CustomerManagementComponent } from '../components/admin/customer-management/customer-management.component';
import { OrederManagementComponent } from '../components/admin/oreder-management/oreder-management.component';
import { OredersListComponent } from '../components/admin/oreders-list/oreders-list.component';

const components=[
  NavbarComponent,
  HomePageComponent,
  FooterComponent,
  NotFoundComponent,
  CarouselComponent,
  AdminProductsComponent,
  ShoppingCartComponent,
  CheckOutComponent,
  OrderSuccessComponent,
  LoginComponent,
  ProductsComponent,
  ProductDetailComponent,
  ZippyComponent,
  OrdersComponent,
  ProfileComponent,
  WishlistComponent,
  ChartsComponent,
  ProductManagmentComponent,
    CategoryManagmentComponent,
    AdminProductsComponent,
    SwitAlertComponent,
    ProductListComponent,
    CustomerManagementComponent,
    OrederManagementComponent,
    OredersListComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
  ],

  exports:[
    components
  ]
})
export class ComponentModule { }
