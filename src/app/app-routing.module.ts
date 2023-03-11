/*import { ProfileComponent } from './components/shared/profile/profile.component';*/
import { OrderSuccessComponent } from './components/client/order-success/order-success.component';
import { CheckOutComponent } from './components/client/check-out/check-out.component';
import { ShoppingCartComponent } from './components/client/shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { ProductDetailComponent } from './components/client/product-detail/product-detail.component';
/*import { NotFoundComponent } from './components/shared/not-found/not-found.component';*/
import { HomePageComponent } from './components/shared/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/client/products/products.component';
import { LoginComponent } from './components/shared/login/login.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

const routes: Routes = [
  
    {path : '' , component: HomePageComponent},
    /*{path : 'courses/:id' , component: CourseComponent},
    {path : 'courses' , component: CoursesComponent},*/
    
    {path : 'products/:p1/:p2' , component: ProductsComponent},
    {path : '' , redirectTo:'products/1/0',pathMatch:'full'},
    {path : 'product-detail/:p' , component: ProductDetailComponent},
    {path : 'login' , component: LoginComponent},
    {path : 'shopping-cart' , component: ShoppingCartComponent},
    {path : 'check-out' , component: CheckOutComponent},
    {path : 'order-success' , component: OrderSuccessComponent},
    {path : 'orders' , component: OrderSuccessComponent},
    {path : 'admin/products' , component: AdminProductsComponent},
    /*{path : 'shared/profile' , component: ProfileComponent},*/
    {path : '**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
