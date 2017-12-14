import { Injectable } from '@angular/core';
import { OrdersService } from '../../orders/orders.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../index';

export const CREATE_ORDER = 'orders/CREATE';
export const ORDER_DETAILS = 'orders/ORDER_DETAILS';

@Injectable()
export class OrdersActions {
  constructor(
    private ordersService: OrdersService,
    private ngRedux: NgRedux<IAppState>
  ) { }
  
  createOrder (order) {
    this.ordersService
      .create(order)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: CREATE_ORDER,
          result
        });
      });
  }

  getOrder (id) {
    this.ordersService
      .getOrderDetails(id)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: ORDER_DETAILS,
          result
        });
      });
  }
}