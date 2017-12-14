import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateRoute } from './core/private-route';
import { PrivateAdminRoute } from './core/private-admin-route';

import { RegisterComponent } from './users/register.component';
import { LoginComponent } from './users/login.component';
import { ProductsListComponent } from './products/products-list.component';
import { CreateProductComponent } from './products/create-product.component';
import { EditProductComponent } from './products/edit-product.component';
import { CreateOrderComponent } from './orders/create-order.component';
import { OrderDetailsComponent } from './orders/order-details.component';
import { OrderStatusComponent } from './orders/order-status.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'products/create', component: CreateProductComponent, canActivate: [PrivateAdminRoute] },
  { path: 'products/edit/:id', component: EditProductComponent, canActivate: [PrivateAdminRoute] },
  { path: 'order/customize/:id', component: CreateOrderComponent, canActivate: [PrivateRoute] },
  { path: 'order/details/:id', component: OrderDetailsComponent, canActivate: [PrivateRoute] },
  { path: 'order/status', component: OrderStatusComponent, canActivate: [PrivateRoute] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CarRoutesModule { }