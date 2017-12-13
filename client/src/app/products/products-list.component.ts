import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { ProductsActions } from '../store/products/products.actions';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products: object = {};
  isAdmin: boolean = false;
  url: string = './assets';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private productsActions: ProductsActions,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.productsActions.getAll()
    this.ngRedux
      .select(state => state.products.allProducts)
      .subscribe(products => this.products = products);

    this.ngRedux
      .select(state => state.users)
      .subscribe(users => this.isAdmin = users.isAdmin);
  }

  deleteProduct(id) {
    this.productsActions.deleteProduct(id);
  }
}