import { Injectable } from '@angular/core';
import { OrdersService } from '../../orders/orders.service';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../index';

export const CREATE_ORDER = 'orders/CREATE';
export const ORDER_DETAILS = 'orders/DETAILS';
export const ORDER_STATUS = 'orders/STATUS';
export const ALL_ORDERS = 'orders/ALL';
export const SAVE_STATUSES = 'orders/STATUSES';

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

  getOrderStatus (id) {
    this.ordersService
      .getOrderStatus(id)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: ORDER_STATUS,
          result
        });
      });
  }

  getAllOrders () {
    this.ordersService
      .getAllOrders()
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: ALL_ORDERS,
          result
        });
      });
  }

  saveStatuses (statuses) {
    this.ordersService
      .saveStatuses(statuses)
      .subscribe(result => {
        this.ngRedux.dispatch({
          type: SAVE_STATUSES,
          result
        });
      });
  }
}