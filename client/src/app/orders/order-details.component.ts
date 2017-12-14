import { Component, OnInit } from '@angular/core';
import { OrdersActions } from '../store/orders/orders.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {
  order: object = {};
  url: string = './assets';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private ordersActions: OrdersActions,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.route.params
      .subscribe(params => {
        const id = params['id'];
        
        this.ordersActions.getOrder(id);

        this.ngRedux
          .select(state => state.orders.orderDetails)
          .subscribe(order => {
            this.order = order;
          })

      });
  }
}