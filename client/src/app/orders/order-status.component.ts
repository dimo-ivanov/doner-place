import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { OrdersActions } from '../store/orders/orders.actions';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html'
})
export class OrderStatusComponent implements OnInit {
  orders: Array<object> = [];
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private ordersActions: OrdersActions,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit () {
    this.isAdmin = this.authService.isAdmin();

    if (this.isAdmin) {
      this.ordersActions.getAllOrders();
    } else {
      const id = this.authService.getToken();
      this.ordersActions.getOrderStatus(id);
    }

    this.ngRedux
      .select(state => state.orders.orders)
      .subscribe(orders => {
        this.orders = orders;
    });
  }

  saveStatuses (event) {
    const length = this.orders.length;
    let statuses = {};
    for (let i = 0; i < length; i++) {
      statuses[event.target[i].name] = event.target[i].value;
    }
    
    this.ordersActions.saveStatuses(statuses);
  }
}