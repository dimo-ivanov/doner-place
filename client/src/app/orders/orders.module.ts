import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { OrdersService } from './orders.service';
import { OrdersActions } from '../store/orders/orders.actions';

import { CreateOrderComponent } from './create-order.component';
import { OrderDetailsComponent } from './order-details.component';
import { OrderStatusComponent } from './order-status.component';

@NgModule({
  declarations: [
    CreateOrderComponent,
    OrderDetailsComponent,
    OrderStatusComponent
  ],
  providers: [
    OrdersService,
    OrdersActions
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class OrdersModule {

}