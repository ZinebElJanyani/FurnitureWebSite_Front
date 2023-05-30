
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
import { OrdersComponent } from './components/client/orders/orders.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { WishlistComponent } from './components/client/wishlist/wishlist.component';
import { ChartsComponent } from './components/admin/charts/charts.component';
import { ProductManagmentComponent } from './components/admin/product-managment/product-managment.component';
import { CategoryManagmentComponent } from './components/admin/category-managment/category-managment.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { CustomerManagementComponent } from './components/admin/customer-management/customer-management.component';
import { OredersListComponent } from './components/admin/oreders-list/oreders-list.component';
import { RoleGuard } from './role.guard';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { OutStockComponent } from './components/admin/out-stock/out-stock.component';

const routes: Routes = [
  
    {path : '' , component: HomePageComponent},
    /*{path : 'courses/:id' , component: CourseComponent},
    {path : 'courses' , component: CoursesComponent},*/
    
    {path : 'products/:p1/:p2' , component: ProductsComponent},
    {path : '' , redirectTo:'products/1/0',pathMatch:'full'},
    {path : 'product-detail/:p' , component: ProductDetailComponent},
    {path : 'login' , component: LoginComponent},
    {path : 'shopping-cart' , component: ShoppingCartComponent, canActivate: [RoleGuard], data: { expectedRole: 'customer' }},
    {path : 'check-out' , component: CheckOutComponent, canActivate: [RoleGuard], data: { expectedRole: 'customer' }},
    {path : 'order-success' , component: OrderSuccessComponent},
    {path : 'wishlist' , component: WishlistComponent},

    {path : 'orders' , component: OrdersComponent, canActivate: [RoleGuard], data: { expectedRole: 'customer' }},
    {path : 'profile' , component: ProfileComponent, canActivate: [RoleGuard], data: { expectedRole: 'customer' }},

    {path : 'admin/customers' , component: CustomerManagementComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
    {path : 'admin/products/list' , component: ProductListComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
    {path : 'admin/orders/list' , component: OredersListComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
    {path : 'admin/outStock' , component: OutStockComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
    {path : 'admin/products/:id' , component: ProductManagmentComponent,canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
   
    {path : 'admin/profile' , component: AdminProfileComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
    {path : 'charts' , component: ChartsComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
    {path : 'admin/categories' , component: CategoryManagmentComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' }},
    /*{path : 'shared/profile' , component: ProfileComponent},*/
    {path : '**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[RoleGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
