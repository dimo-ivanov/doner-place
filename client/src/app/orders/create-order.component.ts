import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { CreateOrderModel } from './create-order.model';
import { AuthService } from '../core/auth.service';
import { OrdersActions } from '../store/orders/orders.actions';

@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html'
})
export class CreateOrderComponent implements OnInit {
  order: CreateOrderModel = new CreateOrderModel();
  product: object = {
    toppings: []
  };
  url: string = './assets';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private authService: AuthService,
    private ordersActions: OrdersActions
  ) { }

  ngOnInit () {
    this.route.params
      .subscribe(params => {
        const id = params['id'];

        this.ngRedux
          .select(state => state.products.allProducts)
          .subscribe(products => {
            for (let category in products) {
              const searchedProduct = products[category].filter(product => product._id == id)[0];
              if (searchedProduct) {
                this.product = Object.assign({}, searchedProduct);

                const toppingsArr = this.product['toppings'];

                this.order.product = id;
                return;
              }
            }
          });
      });
  }

  createOrder (event) {
    const length = this.product['toppings'].length;
    const selectedToppings: Array<string> = [];
    for (let i = 0; i < length; i++) {
      if (event.target[i].checked) {
        selectedToppings.push(event.target[i].value)
      }
    }
    
    this.order.creator = this.authService.getToken();
    this.order.toppings = selectedToppings;

    this.ordersActions.createOrder(this.order);
    let subscription = this.ngRedux
      .select(state => state.orders)
      .subscribe(orders => {
      if (orders.orderAdded) {
        const id = orders.orderAddedId;
        subscription.unsubscribe();

        this.router.navigateByUrl('');
      }
    });
  }
}